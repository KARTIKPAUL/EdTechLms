import { useSearchParams } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayot";
import { useState } from "react";
import toast from "react-hot-toast";
import { isValidEmail } from "../Hepler/regexMatcher";
import axiosInstance from "../Hepler/axiosIntance";

function ContactUs(){

    const [userInput,setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    });

    function handleInputChange(e){
        const {name,value} = e.target;
        console.log(name,value);
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error('All Fields Are Mandatory !!');
            return;
        }
        if(!isValidEmail(userInput.email)){
            toast.error('Email is Not Valid');
            return;
        }

        try {
            const responce = axiosInstance.post('/contact',{...userInput});
            toast.promise(responce,{
                loading: 'Submitting Your Message',
                success: 'Sumitted Message Successfully',
                error: 'Failed To Submit Form'
            })
            const contactResponce = await responce;
            if(contactResponce?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        } catch (error) {
            toast.error('Message Sending Failed')
        }
    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form className="flex flex-col items-center justify-center gap-2
                p-5 rounded-md text-white shadow-[0_0_10px_black] w-22">

                    <h1 className="text-3xl font-semibold">Contact Us</h1>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-lg font-semibold">Name:</label>
                        <input
                            type="text" 
                            placeholder="Enter Your Name" 
                            className="bg-transparent border px-2 py-1 rounded-sm" 
                            id="name" 
                            name="name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-lg font-semibold">Email:</label>
                        <input
                            type="email" 
                            placeholder="Enter Your Email" 
                            className="bg-transparent border px-2 py-1 rounded-sm" 
                            id="email" 
                            name="email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-lg font-semibold">Message:</label>
                        <textarea
                            placeholder="Enter Your Name" 
                            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40" 
                            id="message" 
                            name="message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                        onClick={onFormSubmit}
                        >Submit</button>



                </form>
            </div>
        </HomeLayout>
    )
}

export default ContactUs;