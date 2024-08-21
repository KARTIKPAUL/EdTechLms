import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast'
import axioInstance from '../../Hepler/axiosIntance'
const initialState = {
    courseData: []
}

export const deleteCourses = createAsyncThunk("/courses/delete",async(id) => {
    try {
        const response = axioInstance.delete(`/courses/${id}`);
        toast.promise(response,{
            loading: 'Deleting Course data',
            success: 'Course Deleted Successfuly !!',
            error: 'Failed To Delete The Course'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getAllCourses = createAsyncThunk("/courses/get",async() => {
    try {
        const response = axioInstance.get("/courses");
        toast.promise(response,{
            loading: 'Loading Course data',
            success: 'Course Loaded Successfuly !!',
            error: 'Failed To Get The Course'
        })
        return (await response).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


export const createNewCourse = createAsyncThunk('/course/create',async(data)=>{
    try {
        let formData = new FormData();
        formData.append("title",data?.title);
        formData.append("catagory",data?.catagory);
        formData.append("createdBy",data?.createdBy);
        formData.append("description",data?.description);
        formData.append("thumbnail",data?.thumbnail);

        const response = axioInstance.post('/courses',formData);

        toast.promise(response, {
            loading: 'Crreating New Course',
            success: 'Course Created Sucessfully',
            error: 'Failed to create course'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled,(state,action) => {
            if(action.payload){
                console.log(action.payload);
                state.courseData = [...action.payload]
            }
        })
    }
})

export default courseSlice.reducer