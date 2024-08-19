import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayot";
import { useSelector } from "react-redux";
import { buildCreateSlice } from "@reduxjs/toolkit";

function CourseDescription(){

    const {state} = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(state);
    // },[])

    const {data, role , subscription} = useSelector((state) => state.auth);

    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
                <div className="grid grid-cols-2 gap-2 py-10 relative">
                    <div className="space-y-5">
                        <img 
                            src={state?.thumbnail?.secure_url} 
                            alt="thumbnail"
                            className="w-full h-64vh" 
                        />
                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">Total Lectures is : </span>
                                    {state?.numbersOfLectures}
                                </p>
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">Instructoor : </span>
                                    {state?.createdBy}
                                </p>
                                
                                {
                                    data?.role === 'ADMIN' || data?.subscription?.status === 'active' ? (
                                            <button onClick={() => navigate("/course/displaylectures",{state: {...state}})} className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-200 mt-5">Watch Lectues</button>
                                    ) : (
                                        <button className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-200 mt-5" onClick={() => navigate('/checkout')}>Subcribe</button>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                    
                    <div className="space-y-2 font-xl">
                        <h1 className="text-3xl font-bold text-yellow-600 mb-4 text-center">
                            {state?.title}
                        </h1>
                        <p className="text-yellow-500">
                            Course Description : 
                        </p>
                        <p className="">
                            {state?.description}
                        </p>
                    </div>

                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseDescription;