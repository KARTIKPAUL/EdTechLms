import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../Hepler/axiosIntance'
const initialState = {
    allUserCount: 0,
    subscribeCount: 0
} 


export const getStatsData = createAsyncThunk("stats/get",async() => {
    try {
       const response = axiosInstance.get('/admin/stats/users');
       toast.promise(response , {
        loading: "Getting The Stats",
        success:(data) => {
           return data?.data?.message
        }, 
        error: "Failed To Load The Data"
       })
       return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       builder.addCase(getStatsData.fulfilled,(state,acttion) => {
        console.log(acttion);
        state.allUserCount = acttion?.payload.allUserCount;
        state.subscribeCount = acttion?.payload?.subscribeCount
       }) 
    }
})

export default stateSlice.reducer;

