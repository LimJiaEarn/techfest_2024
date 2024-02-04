import React from 'react';
import heroImage from "../assets/heroImage.png";
import Button from "./Button.jsx";

const Hero = () => (
    
    <section className="flex md:flex-row flex-col items-center justify-center">

        <div className={`flex-1 flex-col xl:px-30 sm:px-16 px-6`}>

            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-semibold ss:text-[5rem] text-[2rem] text-white ss:leading-[6rem] leading-[4rem]">
                    Prepping For
                    <br className="sm:block hidden"/>
                    <span className="text-gradient">Your</span>
                </h1>

                <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient"/>
                <div className="absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient"/>    
            </div>


            <h1 className="font-semibold ss:text-[4rem] text-[3rem] text-coral ss:leading-[6rem] leading-full">
                Job Hunt
            </h1>

            <p className={`max-w[470px] mt-5 text-textwhite`}>
                Our algorithm identify your biggest skill gaps so you can bridge it. We examine your skills, experience and qualifications.
            </p>

            <Button styles="mt-10 text-black bg-blue-gradient" text="Get Started"/>

        </div>

        <div className={`flex-1 flex md:my-10 relative`}>            
            <img src={heroImage} alt="jobsearch" className="w-[500px] h-[500px] relative z-[5] object-contain"/>

        </div>




    </section>
    
)

export default Hero;