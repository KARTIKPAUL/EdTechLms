import User from "../Models/userModel.js";
import AppError from "../Utility/errorUtil.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;;
    //console.log(token);
    

    if (!token) {
        return next(new AppError("Unauthenticated, please login again", 400));
    }

    try {
        const userDetails = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userDetails;
        next();
    } catch (error) {
        return next(new AppError("Invalid token, please login again", 401));
    }
};


const authorisedRoles = (...roles) => async (req, res, next) => {
    const currentUserRoles = req.user.role;
    if (!roles.includes(currentUserRoles)) {
        return next(new AppError("You do not have permission to access this routes", 403))
    }
    next();
}

const authoriseddSusbcriber = async(req,res,next) => {
    //const subcription = req.user.subcription
    //const currentUserRoles = req.user.role;

    const {role ,id} = req.user;
    const user = await User.findById(id);
    const subcriptionStatus = user.subscription.status;
    console.log(subcriptionStatus);
    console.log(user);
    if(role !== 'ADMIN' && subcriptionStatus !== 'active'){
        return next(
            new AppError('Please Subscribe to Access Course',403)
        )
    }
    next();
}

export {
    isLoggedIn,
    authorisedRoles,
    authoriseddSusbcriber
}