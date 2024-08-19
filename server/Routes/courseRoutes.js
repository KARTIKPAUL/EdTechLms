import {Router} from 'express'
import { createCourse, getAllCourses, getLectureByCourseId, removeCourse, updateCourse , addLectureToCourseById } from '../Controllers/courseController.js';
import { isLoggedIn, authorisedRoles } from "../Middlewares/authMiddleware.js";
import upload from '../Middlewares/multerMiddleware.js';

const router = Router();

router.route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorisedRoles('ADMIN'),
        upload.single('thumbnail'),
        createCourse)
//router.get('/all',getAllCourses)
router.route('/:id')
    .get(
        isLoggedIn,
        //authorisedRoles('USER'),
        getLectureByCourseId
    )
    .put(
        isLoggedIn,
        authorisedRoles('ADMIN'),
        updateCourse
    )
    .delete(
        isLoggedIn,
        authorisedRoles('ADMIN'),
        removeCourse,
    )
    .post(
        isLoggedIn,
        authorisedRoles('ADMIN'),
        upload.single('lecture'),
        addLectureToCourseById
    )

export default router;