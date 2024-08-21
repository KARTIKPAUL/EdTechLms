import User from '../Models/userModel.js'
import AppError from '../Utility/errorUtil.js'
const stats = async (req,res,next) => {
    try {
        const allUsers = await User.find({});
        const allUserCount = allUsers.length;
        const subscribeCount = allUsers.filter((user) => user.subscription.status === 'active').length;

        res.status(200).json({
            success: true,
            message: 'stats',
            allUserCount,
            subscribeCount
        })

    } catch (error) {
        return next(new AppError(error.message),500)
    }
}

export {
    stats
}

