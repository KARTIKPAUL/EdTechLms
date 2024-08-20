import Course from "../Models/courseModel.js"
import AppError from "../Utility/errorUtil.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const getAllCourses = async function(req,res,next) {
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
        const { id } = req.params;
        const course = await Course.findById(id);
        console.log(id);
        

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

const createCourse = async function(req,res,next) {
    try {
        const {title,description,catagory,createdBy} = req.body; 

        if(!title || !description || !catagory || !createdBy){
            return next(new AppError('All Fields Are RRequired For Create A Course',400));
        }
    
            const course = await Course.create({
                title,
                description,
                catagory,
                createdBy,
                thumbnail: {
                    public_id: 'Dummy',
                    secure_url: 'Dummy'
                }
            });
    
            if(!course){
                return next(new AppError('Course Not Created',400)); 
            }
    
    
            if(req.file){
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder: 'FinalLms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                })
                if(result){
                    course.thumbnail.public_id = result.public_id;
                    course.thumbnail.secure_url = result.secure_url;
                }
    
                fs.rm(`uploads/${req.file.filename}`)
            }
    
            await course.save();
    
            res.status(200).json({
                success: true,
                message: 'Course Created Sucessfully',
                course,
            })
    } catch (error) {
        return next(new AppError(`Some Went Wrong When Creating Cousre ! ${error.message}`,501));
    }
}

const updateCourse = async function(req,res,next) {
    try {
        const {id} = req.params;
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            {
                runValidators: true
            },
        );

        if(!course){
            return next(new AppError(`Course With Given Id Not Exists`,400));
        }

        res.status(200).json({
            success: true,
            message: "Couse Update Sucessfully !",
            course
        })

    } catch (error) {
        return next(new AppError(`Course Update Failed !, ${error.message}`),501);
    }
}

const removeCourse = async function(req,res,next) {
    try {
       const { id }= req.params;
       const course = await Course.findById(id);
       if(!id){
        return next(new AppError(`Course With Given Id Does Not Exists `,400));
       } 

       await course.deleteOne()
       res.status(200).json({
        success: true,
        mesggage: 'Course Deleted Successfully !!',
        course
       })
    } catch (error) {
        return next(new AppError(`Remove Course Failed ! , ${error.message}`),400)
    }
}

const addLectureToCourseById = async function(req,res,next) {

    try {
        const {title,description} = req.body;

    const {id} = req.params;

    if(!title || !description){
        return next(new AppError('Title And Description Are Missing When Uploaded lecture',400));
    }

    const course = await Course.findById(id);
    if(!course){
        return next(new AppError('Not Find Any Course !!',400));
    }

    const lectureData = {
        title,
        description,
        lecture: {}
    }

    if(req.file){
        const result = await cloudinary.v2.uploader.upload(req.file.path,{
            folder: 'FinalLms',
            resource_type: "video"
        })
        if(result){
            lectureData.lecture.public_id = result.public_id;
            lectureData.lecture.secure_url = result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`)
    }

    course.lectures.push(lectureData);
    course.numbersOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: 'Lecture Uploaded Succcesfully',
        course 
    })

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

// const removeLecture = async (req,res,next) {
//     const {id} = req.params;

// }

export {
    getAllCourses,getLectureByCourseId , createCourse , updateCourse , removeCourse , addLectureToCourseById
}


