import { configureStore }from '@reduxjs/toolkit'
import authSliceReducer from './Slices/authSlice';
import courseSliceReducer from './Slices/courseSlice';
import razorpaySlice from './Slices/razorpaySlice';
import lectureSliceReducer from './Slices/LectureSlice';
import stateSliceReduces from './Slices/stateSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        courses: courseSliceReducer,
        razorpay: razorpaySlice,
        lecture: lectureSliceReducer,
        stat: stateSliceReduces
    },
    devTools: true
})

export default store;

