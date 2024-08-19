import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layouts/HomeLayot";
import { Link, useNavigate } from "react-router-dom";
import { buildCreateSlice } from "@reduxjs/toolkit";
import { getUserData } from "../../Redux/Slices/authSlice";
import { cancelCourseBundle } from "../../Redux/Slices/razorpaySlice";
import toast from "react-hot-toast";

function Profile(){

    const userData = useSelector((state) => state?.auth?.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    async function handlcancellation(){
        toast("Initiating cancellation");
        await dispatch (cancelCourseBundle());
        await dispatch(getUserData());

        toast.success("Cancellation Completed");
        navigate("/");

    }

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex item-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <img 
                        src={userData?.avater?.secure_url}
                        className="w-40 rounded-full m-auto border-black"
                    />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="frid grid-cols-2">
                        <p>Email : {userData?.email}</p>
                        <br />
                        <p>Role : {userData?.role}</p>
                        <br />
                        <p>Subscription : {userData?.subscription?.status === 'active' ? 'Active' : 'Inactiive'}</p>
                    </div>

                    <div className="flex items-center justify-between gap-2">

                        <Link to='/changepassword' className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded font-semibold py-2 cursor-pointer text-center">
                            <button>Change Password</button>
                        </Link>

                        <Link to='/user/editprofile' className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded font-semibold py-2 cursor-pointer text-center">
                            <button>Edit Profile</button>
                        </Link>

                    </div>

                {userData?.subscription?.status === 'active' && (
                        <button onClick={handlcancellation} className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">Cancel Subscription</button>
                )}
                </div>
            </div>
        </HomeLayout>
    )
}

export default Profile