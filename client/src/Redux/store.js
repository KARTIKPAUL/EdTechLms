import { configureStore }from '@reduxjs/toolkit'
import authSliceReducer from './Slices/authSlice';
import courseSliceReducer from './Slices/courseSlice';
import razorpaySlice from './Slices/razorpaySlice';
import lectureSliceReducer from './Slices/LectureSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        courses: courseSliceReducer,
        razorpay: razorpaySlice,
        lecture: lectureSliceReducer
    },
    devTools: true
})

export default store;

