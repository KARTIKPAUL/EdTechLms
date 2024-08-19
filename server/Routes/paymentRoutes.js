import Router from 'express'
import { allPayments, bySubscription, cancelSubscription, getRazorpayApiKey, verifySubscription } from '../Controllers/paymentController.js';
import { authoriseddSusbcriber, authorisedRoles, isLoggedIn } from '../Middlewares/authMiddleware.js';


const router = Router();

router
    .route('/razorpay-key')
    .get(
        isLoggedIn,
        getRazorpayApiKey
    );
    console.log("Helakahah");
    
    

router
    .route('/subscribe')
    .post(
        isLoggedIn,
        bySubscription
    );

router
    .route('/verify')
    .post(
        isLoggedIn,
        verifySubscription
    );

router
    .route('/unsubscribe')
    .post(
        isLoggedIn,
        authoriseddSusbcriber,
        cancelSubscription
    );

router
    .route('/')
    .get(
        isLoggedIn,
        authorisedRoles('ADMIN'),
        allPayments
    );

export default router;