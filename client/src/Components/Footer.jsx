import React from "react";
import {BsFacebook , BsInstagram , BsLinkedin , BsTwitter} from 'react-icons/bs'

function Footer(){
    const currYear = new Date();
    const year = currYear.getFullYear();
    return(
        <>
           <footer className="relative left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 py-5 sm:px-20">
            <section className="text-lg">
                CopyRight {year} | All Right Reserved
            </section>
            <section className="flex items-center justify-center gap-5 text-2xl text-white">
                <a href="" className="hover:text-yellow-500 duration-200 transition-all ease-in-out"> <BsFacebook /> </a>
                <a href="" className="hover:text-yellow-500 duration-200 transition-all ease-in-out"> <BsInstagram /> </a>
                <a href="" className="hover:text-yellow-500 duration-200 transition-all ease-in-out"> <BsLinkedin /> </a>
                <a href="" className="hover:text-yellow-500 duration-200 transition-all ease-in-out"> <BsTwitter /> </a>
            </section>
           </footer>
        </>
    )
}

export default Footer;