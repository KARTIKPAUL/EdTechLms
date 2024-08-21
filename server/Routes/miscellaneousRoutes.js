import {Router} from 'express'
import { stats } from '../Controllers/miscellaneousController.js'
import { authorisedRoles, isLoggedIn } from '../Middlewares/authMiddleware.js';

const router = Router();

router.get('/admin/stats/users',isLoggedIn,authorisedRoles("ADMIN"),stats);

export default router;