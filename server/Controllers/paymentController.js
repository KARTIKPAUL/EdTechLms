import User from "../Models/userModel.js";
import { razorpay } from "../server.js";
import AppError from "../Utility/errorUtil.js";
import crypto from 'crypto'
import Payment from "../Models/paymentModel.js";
import dotenv from 'dotenv'
import { log } from "console";
dotenv.config();

const getRazorpayApiKey = async(req,res,next) => {
    //console.log("Hello");
    
    try {
        res.status(200).json({
            success: true,
            message: "Razorpay API Key",
            key: process.env.RAZORPAY_KEY_ID
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const bySubscription = async (req,res,next) => {

    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("Unauthorized, please login"));
        }

        if (user.role === "ADMIN") {
            return next(new AppError("Admin cannot purchase a subscription", 400));
        }

        const data = {
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 1
        }
        //console.log(data);
        
        const subscription = await razorpay.subscriptions.create(data);
      
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        // console.log(user.subscription.status);
        // console.log(user.subscription.id);
        
        await user.save();
        res.status(200).json({
            success: true,
            message: "Subscribed Successfully",
            subscription_id: subscription.id,
        });
    }
    catch (error) {
        return next(new AppError(error, 500));
    }
}


const verifySubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return next(new AppError('Unauthorised, please login', 500))
        }

        const subscriptionId = user.subscription.id;
        console.log("Subcription Id is ; ", subscriptionId);
        
        const dataToHash = `${razorpay_payment_id}|${subscriptionId}`;
        console.log("Data to hash: ", dataToHash);

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}|${subscriptionId}`)
            .digest('hex');

        console.log(generatedSignature);
        console.log(razorpay_signature);
        
        
        if (generatedSignature !== razorpay_signature) {
            return next(new AppError("Payment Not Verified, please try again", 500))
        }

        await Payment.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id
        })

        user.subscription.status = 'active';
        await user.save();

        res.status(200).json({
            success: true,
            message: "Payment Varified Successfully",

        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const cancelSubscription = async(req,res,next) => {
    
        const {id} = req.user;
        const user = await User.findById(id);
        console.log('User Fetch Successfully');
        

        if(!user){
        return next(new AppError('User Not Authorize',400));
        }

        if (user.role === 'ADMIN'){
        return next(new AppError('Admin Can not purchase subscription',400))
        }
        console.log(user.role);
        

        const subcsriptionId = user.subscription.id;
        console.log(user.subscription.status);
        console.log(subcsriptionId);
        
        

        
        try {
            const subscription = await razorpay.subscriptions.cancel(
                subcsriptionId
            );
    
            user.subscription.status = subscription.status;
    
            await user.save();

            res.status(200).json({
                success: true,
                message: "Unsubcribe Successfully",
    
            })

            

        } catch (error) {
            return next(new AppError(error.message, 500));
        }
}

const allPayments = async(req,res,next) => {
    try {
        const {count} = req.query;

        const subcription = await razorpay.subscriptions.all({
            count: count || 10
        });

        //const payments = 

        res.status(200).json({
            success: true,
            message: 'All Payments',
            subcription,
        })
    } catch (error) {
        return next(new AppError(`All Payments Fetch failed ${error.message}`,400));
    }
}
 
export {
    getRazorpayApiKey,
    bySubscription,
    verifySubscription,
    allPayments,
    cancelSubscription
}