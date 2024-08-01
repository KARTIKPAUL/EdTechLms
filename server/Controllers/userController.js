import User from "../Models/userModel.js";
import AppError from "../Utility/errorUtil.js";
import cloudinary from 'cloudinary'
import cookieParser from "cookie-parser";
import sendEmail from "../Utility/sendEmail.js";
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

// import fs from 'promisefs';

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 1000, //7 Days
    httpOnly: true,
    secure: true
}

const register = async (req,res,next) => {
    try{
        const {fullName , email , password } = req.body;

    if(!fullName || !email || !password){
        return next (new AppError('All Fields are Required',400))
    }

    const userExists = await User.findOne({ email });
    if(userExists){
        return next (new AppError('Email Already Exists',400))
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avater: {
            public_id: email,
            secure_url: ''
        },
    });

    if(!user){
        return next (new AppError('User Registration Failed',400))
    }

    //Todo => File Upload

    if(req.file){
        console.log(req.file);
        try {
            const result =await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'FinalLms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill'
            });

            if(result){
                user.avater.public_id = result.public_id;
                user.avater.secure_url = result.secure_url;

                //Remove File From Local Or Server

                //fs.rm(`uploads\${req.file.filename}`);

            }
        } catch (error) {
            return next(new AppError(`error Happen When File Uploaded ! ${error.message}`,400))
        }
    }

    await user.save();
    user.password = undefined;

    const token = await user.generateJWTToken();
    res.cookie('token',token,cookieOptions)

    res.status(201).json({
        sucess: true,
        message: 'User Create Sucessfully !!',
        user,
    })
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const login = async (req,res,next) => {
    try {
        const {email , password} = req.body;

    if(!email || !password){
        return next (new AppError('All Fields are Required',400))
    }

    const user = await User.findOne({email}).select('+password');

    if(!user || !user.comparePassword(password)){
        return next (new AppError('Email Or Password Not Match',400))
    }

    const token = user.generateJWTToken();
    user.password = undefined;
    res.cookie('token',token,cookieOptions);

    res.status(200).json({
        sucess: true,
        message: 'User Login Sucessfulli !!',
        user
    })
    } catch (error) {
        return next (new AppError(`Error Happen When Trying Login ${error.message}`,500))
    }
}

const logout = (req,res) => {
    res.cookie('token', null,{
        secure: true,
        maxAge: 0,
        httpOnly: true
    })

    res.status(200).json({
        sucess: true,
        message: 'User Logged Out Sucessfully !!'
    })
}

const getProfile = async (req,res,next) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({userId});

        res.status(200).json({
            sucess: true,
            message: 'User Fetch Sucessfully !!',
            user
        })

    } catch (error) {
        return next (new AppError(`Failed To fetch user details ${error.message}`,500))
    }
}

const forgotPassword = async (req,res,next) => {
    const {email} = req.body;
    if(!email){
        return next (new AppError(`Please Provide a Valid Email`,400))
    }

    const user = await User.findOne({email});
    if(!user){
        return next (new AppError(`Email Not Regsitered`,400))
    }

    const resetToken = await user.generatePasswordResetToken();
    await user.save();

    //const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const resetPasswordUrl = `http://localhost:3000/api/v1/user/reset/${resetToken}`
    console.log(resetPasswordUrl);

    const message = "This is my one of the best momment";
    const subject = 'This is Momment';

    try {
        await sendEmail(email,subject,message);
        res.status(200).json({
            sucsess: true,
            message: `Reset Password Email Send To ${email} Sucessfully !!`
        })
    } catch (error) {
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();

        return next(new AppError('Failed While Send Reset Email',400))
    }
}

const resetPassword = async (req,res,next) => {
    const {resetToken} = req.params;

    const { password } = req.body;

    const forgotPasswordToken = await crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')


    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: {
            $gt: Date.now()
        }
    })

    if(!user){
        return next(new AppError('Token Not Valid',400))
    }

    user.password = password
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined;
    user.save();

    res.status(200).json({
        success: true,
        message: 'Password Changed Sucessfully !!'
    })
}

const changePassword = async (req,res,next) => {
    const {email,oldPassword , newPassword} = req.body;

    //const { id } = req.user;

    if(!oldPassword || !newPassword){
        return next(new AppError('Both Password are Required',400));
    } 

    const user = await User.findOne({email}).select('+passowrd');
    if(!user){
        return next(new AppError('Both Password are Required',400));
    }

    // if (!(bcrypt.compareSync(oldPassword, user.password))) {
    //     return next(new AppError("Invalid Old Password", 400));
    // }

    user.password = newPassword;
    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password Changed Hoie Geche Sucessfully !!'
    })
}

const updateUser = async (req,res,next) => {
    const {email,fullName} = req.body;
    //const {id} = req.user.id;

    const user = await User.findOne({email});
    if(!user){
        return next(new AppError('user Not Exists',400));
    }

    // if(req.fullName){
    //     user.fullName = fullName;
    // }

    user.fullName = fullName;

    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avater.public_id);
        try {
            const result =await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'FinalLms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill'
            });

            if(result){
                user.avater.public_id = result.public_id;
                user.avater.secure_url = result.secure_url;

                //Remove File From Local Or Server

                //fs.rm(`uploads\${req.file.filename}`);

            }
        } catch (error) {
            return next(new AppError(`error Happen When File Uploaded ! ${error.message}`,400))
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: 'User Details Update Sucessfully !!'
    })

}

export {
    login,logout,getProfile,register,forgotPassword,resetPassword,changePassword , updateUser
}