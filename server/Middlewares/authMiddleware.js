import AppError from "../Utility/errorUtil.js"
import jwt from 'jsonwebtoken'

const isLoggedin = async (req,res,next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new AppError('Unauthenticated,Please Login',404))
    }
    const userDeatils = await jwt.verify(token,process.env.JWT_SECRET);

    req.user = userDeatils;
    next();
}

export {
    isLoggedin
}