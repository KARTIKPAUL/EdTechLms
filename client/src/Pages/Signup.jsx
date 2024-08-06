import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayot";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import { createAccount } from "../Redux/Slices/authSlice";

function Signup(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage , setPreviewImage] = useState('');
    const[signupData,setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avater: ""
    })

    function handleUserInput(e){
        const {name,value} = e.target;
        setSignupData(({
            ...signupData,
            [name]: value
        }))
    }

    function getImage(event){
        event.preventDefault();
        const uploadImage = event.target.files[0];

        if(uploadImage){
            setSignupData({
                ...signupData,
                avater: uploadImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener('load',function(){
                //console.log(this.result);
                setPreviewImage(this.result)
            })
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();
        if (!signupData.email || !signupData.password || !signupData.fullName) {
          toast.error("Please fill all the details");
          return;
        }
    
        // checking name field length
        if (signupData.fullName.length < 5) {
          toast.error("Name should be atleast of 3 characters");
          return;
        }
        //checking valid email
        if (!signupData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
          toast.error("Invalid email id");
          return;
        }
    
        if (signupData.password.length < 8) {
            toast.error("Password should be atleast of 8 characters");
            return;
          }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avater", signupData.avater);
    
        // dispatch create account action
        const response = await dispatch(createAccount(formData));
        console.log(response);
        
        if (response?.payload?.sucess){
          navigate("/");
        
          setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: "",
          });
          setPreviewImage("");

        }

        }


    return(
        <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
            <form onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                <label htmlFor="image_uploads" className="cursor-pointer">
                   {previewImage ? (
                        <img src={previewImage} alt="previewImage" className="w-24 h-24 rounded-full m-auto"/>
                    ) : (
                        <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                    )}
                </label>

                 <input 
                    onChange={getImage}
                    className="hidden" 
                    type='file' 
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg,.jpeg,.png,.svg"
                    required
                    />

                <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold"> FullName </label>
                        <input 
                            type="text"
                            name="fullName" 
                            id="fullName"
                            required
                            placeholder="Enter Your FullName"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                            />
                        </div>

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
                            value={signupData.email}
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
                            value={signupData.password}
                            />
                    </div>

                    <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 translate-all ease-in-out duration-300 rounded py-2 font-semibold text-xl my-2">Create Account</button>

                    <p className="text-center">
                        Already Have An Account ? <Link to='/login' className="link text-accent"> Login </Link>
                    </p>
            </form>

        </div>

        </HomeLayout>
    )
}

export default Signup;