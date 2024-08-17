import { configureStore }from '@reduxjs/toolkit'
import authSliceReducer from './Slices/authSlice';
import courseSliceReducer from './Slices/courseSlice';
import razorpaySlice from './Slices/razorpaySlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        courses: courseSliceReducer,
        razorpay: razorpaySlice
    },
    devTools: true
})

export default store;

