import {Router} from 'express'
import { getAllCourses, getLectureByCourseId } from '../Controllers/courseController.js';
import isLoggedin from '../Middlewares/authMiddleware.js';

const router = Router();

router.route('/')
    .get(getAllCourses)
router.route('/:id')
    .get(isLoggedin,getLectureByCourseId)

export default router;