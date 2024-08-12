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

export {
    isLoggedIn,
    authorisedRoles,
}