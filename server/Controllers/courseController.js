import Course from "../Models/courseModel.js"
import AppError from "../Utility/errorUtil.js";

const getAllCourses = async function(req,res,next){
    
    try {
        const courses = await Course.find({})
        .select('-lectures');

        res.status(200).json({
        success: true,
        message: 'All Courses Are Here !!',
        courses,
    })
    } catch (error) {
        return next(new AppError(`Fetching Course failed !!,${error.message}`,400))
    }

}

const getLectureByCourseId = async function(req,res,next){
    try {
        const {id} = req.params;

        const course = await Course.findById(id);

        if(!course){
            console.log(id);
            
            return next(new AppError(`Course Not Found !!,${error.message}`,400))
        }

        res.status(200).json({
            success: true,
            message: 'Course lecture Fetched Sucesshully',
            lectures: course.lectures
        })
    } catch (error) {
        return next(new AppError(`Getting Course failed !!,${error.message}`,400))
    }
}

export {
    getAllCourses,getLectureByCourseId
}


