import { configureStore }from '@reduxjs/toolkit'
import authSliceReducer from './Slices/authSlice';
import courseSliceReducer from './Slices/courseSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        courses: courseSliceReducer
    },
    devTools: true
})

export default store;

