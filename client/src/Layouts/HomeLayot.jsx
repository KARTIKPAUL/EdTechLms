import React from "react";
import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from 'react-redux'

function HomeLayout({children}){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Checked LoggedIn
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)

    //For Displaying Role
    const role = useSelector((state) => state?.auth?.role)


    function changeWidth(){
        const drawerSide = document.getElementsByClassName('drawer-side')
        drawerSide[0].style.width = 'auto'
    }
    function hideDrawer(){
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false

        const drawerSide = document.getElementsByClassName('drawer-side')
        drawerSide[0].style.width = '0'
    }

    function handleLogout(e){
        e.preventDefault();
        //const res = await dispatch(logout());
        if(res?.payload?.success)navigate('/')
    }

    return(
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox"/>
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                        onClick={changeWidth} 
                        className="font-bold text-white bg-gray-800 m-5" size={"32px"}/>
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label
                    htmlFor="my-drawer"
                    className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
                    <li className="w-fit absolute right-2 z-50">
                        <button className="" onClick={hideDrawer}>
                            <AiFillCloseCircle size={24} />
                        </button>
                    </li>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {isLoggedIn && role === 'ADMIN' && (
                        <li>
                            <Link to='/admin/dashboard'>Admin DashBoard</Link>
                        </li>
                    )}
                    <li>
                        <Link to='/courses'>Courses</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact Us</Link>
                    </li>
                    <li>
                        <Link to='/about'>About Us</Link>
                    </li>
                    {!isLoggedIn && (
                        <li className="absolute w-[90%] bottom-4">
                            <div className="w-full flex items-center justify-center">
                            <button className="bg-violet-500 px-4 py-1 font-semibold rounded-md w-full">
                                <Link to='/login'>Login</Link>
                            </button>
                            <button className="bg-pink-500 px-4 py-1 font-semibold rounded-md w-full">
                                <Link to='/signup'>Signup</Link>
                            </button>
                        </div>
                        </li>
                    )}

                    {isLoggedIn && (
                        <li className="absolute w-[90%] bottom-4">
                            <div className="w-full flex items-center justify-center">
                            <button className="bg-violet-500 px-4 py-1 font-semibold rounded-md w-full">
                                <Link to='/user/profile'>Profile</Link>
                            </button>
                            <button className="bg-pink-500 px-4 py-1 font-semibold rounded-md w-full">
                                <Link onClick={handleLogout} to='/logout'>Logout</Link>
                            </button>
                        </div>
                        </li>
                    )}

                    </ul>
                </div>
            </div>
            {children}
            <Footer />
        </div>
    )
}

export default HomeLayout;