import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Hepler/axiosIntance";
import { json } from "react-router-dom";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggenIn') || false,
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem('data') || {}
}

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("/user/login", data);
        toast.promise(res, {
            loading: "Wait ! Authentication will progeress",
            success: (data) => {
                return data?.data?.message
            },
            error: 'Failed To Login'
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    const loadingMessage = toast.loading("Please wait ! creating your account...");
    try {
        const res = await axiosInstance.post("/user/register", data);
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled,(state,action) => {
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user; 
            state.role = action?.payload?.user?.role;
        })
    }
})

export const {} = authSlice.actions;
export default authSlice.reducer;