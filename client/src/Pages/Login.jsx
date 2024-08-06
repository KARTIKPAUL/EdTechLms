import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayot";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import {login } from "../Redux/Slices/authSlice";

function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[loginData,setLoginData] = useState({
        email: "",
        password: "",
    })

    function handleUserInput(e){
        const {name,value} = e.target;
        setLoginData(({
            ...loginData,
            [name]: value
        }))
    }

    async function onLogin(event) {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
          toast.error("Please fill all the details");
          return;
        }
    
        //checking valid email
        if (!loginData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
          toast.error("Invalid email id");
          return;
        }
    
        if (loginData.password.length < 8) {
            toast.error("Password should be atleast of 8 characters");
            return;
          }

    
        // dispatch create account action
        const response = await dispatch(login(loginData));
        console.log(response);
        
        if (response?.payload?.success){
          navigate("/");
        
          setLoginData({
            email: "",
            password: "",
          });
        }

        }


    return(
        <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
            <form onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                <h1 className="text-center text-2xl font-bold">Login Page</h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="eamil" className="font-semibold"> Email </label>
                        <input 
                            type="email"
                            name="email" 
                            id="email"
                            required
                            placeholder="Enter Your Valid"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.email}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold"> Password </label>
                            <input 
                            type="password"
                            name="password" 
                            id="password"
                            required
                            placeholder="Enter Your Password"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.password}
                            />
                    </div>

                    <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 translate-all ease-in-out duration-300 rounded py-2 font-semibold text-xl my-2">Login</button>

                    <p className="text-center">
                        Don't Have An Account ? <Link to='/signup' className="link text-accent"> Signup </Link>
                    </p>
            </form>

        </div>

        </HomeLayout>
    )
}

export default Login;