import AppError from "../Utility/errorUtil.js";
import jwt from 'jsonwebtoken'
const isLoggedin = async (req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new AppError('Unauthenticated ! Please Login Again',401));
    }

    const userDetails = await jwt.verify(token,process.env.JWT_SECRET);

    res.user = userDetails
    next();
}

export default isLoggedin