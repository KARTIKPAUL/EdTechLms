import User from "../Models/userModel.js";
import AppError from "../Utility/errorUtil.js";
import bcrypt from 'bcryptjs'
import cloudinary from 'cloudinary'
//import fs from 'fs/promises'

//Cookis setUp

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    httpOnly: true,
    secure: true
}



//Regsiter/SignUp
const register = async (req,res,next) => {
    try {
        const { fullname,email,password }= req.body;
        if(!fullname || !email || !password){
        return next(new AppError('All Fields are required For Registration',400));
    }
        const userExits = await User.findOne({ email })

    if(userExits) {
        return next(new AppError('Email already exists',400))
    }
    const user = await User.create({
        fullname,
        email,
        password,
        avater: {
            public_id: email,
            secure_url: "",
        },
    });
    if(!user){
        return next(new AppError('User Registretion failed ! Please Try Again',400))
    }

    //Todo => File Upload

    console.log(req.file);
    if(req.file){
        try {
          const result =  await cloudinary.v2.uploader.upload(req.file.path,{
            folder: 'lms',
            width: 250,
            height: 250,
            gravity: "faces",
            crop: "fill",
          })
          if(result){
            user.avater.public_id = result.public_id,
            user.avater.secure_url = result.secure_url
            console.log(result.secure_url);

          }

            //Remove File from server
            //fs.rm(`uploads/${req.file.fileName}`)


        } catch (error) {
            return next(
                new AppError(error || 'File Not Uploaded Please Try Again',500)
            )
        }
    }

    await user.save();
    user.password = undefined;

    const token = await user.generateJWTToken()

    res.cookie("token",token,cookieOptions)

    res.status(201).json({
        success: true,
        message: 'User Register Successfully',
        user
    })

    } catch (error) {
        return next(new AppError("User registration failed, please try again", 400));
    }
    
}

//Login
const login = async (req,res) => {
    try {
        const { email, password} = req.body;
    if(!email || !password){
        return next(new AppError('All Fields are required For Login',400));
    }

    const user = await User.findOne({
        email
    }).select('+password')

    if(!user || !(bcrypt.compareSync(password,user.password))){
        return next(new AppError('Email Or Password Does Not Match',400));
    }

    const token = await user.generateJWTToken()
    user.password = undefined
    res.cookie('token',token,cookieOptions)

    res.status(200).json({
        success: true,
        messgae: 'User Loggedin Successfully',
        user
    })
    } catch (error) {
        return next(new AppError(error.message,500))
    }
}

//Get User
const getuser = async (req,res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId)
        res.status(200).json({
            success: true,
            message: 'User Details',
            user
        })
    } catch (e) {
       return next(new AppError('Failed to Fetch Details',500))
    }
}

//Logout
const logout = (req,res) => {
    res.cookie('token',null,{
        secure: true,
        maxAge: 0,
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'User Logged Out Successfully'
    })
}


//ForGot Password

const forgotPassword = async (req,res) => {
    const { email } = req.body;

    if(!email){
        return next(new AppError('Email is required',500));
    }

    const user = await User.findOne({email});
    if(!user){
        return next(new AppError('Email Not Registered',500));
    } 
    const resetToken = await user.generatePasswordResetToken();
    await user.save();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

    try {
       await sendEmail(email,subject,message)
       
       res.status(200).json({
        success: true,
        message: 'Reset Password has been send successfully'
       })
    } catch (error) {
        user.forgetPassword = undefined;
        user.forgetPasswordExpiry = undefined;
        await user.save();
        return next(new AppError(error.message,500));
    }

}

//Reset Password
const resetPassword = () => {

}

export {
    register,
    login,
    getuser,
    logout,
    forgotPassword,
    resetPassword
}