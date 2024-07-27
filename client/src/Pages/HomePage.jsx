import React from "react";
import HomeLayout from "../Layouts/HomeLayot";
import { Link } from "react-router-dom";
import homePageMainImage from '../assets/homePageMainImage.png'
import aboutMainImage from '../assets/aboutMainImage.png'

function HomePage(){
    return(
        <HomeLayout>
           <div className="flex items-center justify-center">
           <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]"></div> 
           <div className="w-1/2 space-y-6">
           <h1 className="text-5xl font-semibold">
            Find Out Best &nbsp; 
            <span className="text-yellow-500 font-bold">OnLine Courses</span>
           </h1>
           <p className="text-xl text-gray-200">We habe Large Library Of Courses taught by highly skilled and qualified faculty as a very affordabe cost</p>
           <div className="space-x-6">
            <Link to='/courses'>
                <button className="border bg-yellow-500 px-5 py-3 rounded-md text-white font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">Explore Courses</button>
            </Link>
            <Link to='/contact'>
                <button className="border border-yellow-500 px-5 py-3 bg-gray-800 rounded-md text-white font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">Contact Us</button>
            </Link>
           </div>
           </div>
           <div className="w-1/2 flex justify-center items-center">
           <img src={homePageMainImage} alt="HomePagePic" />
           </div>
           </div>
        </HomeLayout>
    )
}

export default HomePage;