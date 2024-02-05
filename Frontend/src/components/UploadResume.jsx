import { useState, useEffect, useRef } from "react";
import { useResumeContext } from "../contexts/resumeContext.jsx";

import uploadResumeIcon from "../assets/upload-resume.svg";

function UploadResume() {
    
    const { file, setFile, email, setEmail, skills, setSkills, education, setEducation, workExperience, setWorkExperience} = useResumeContext();
    
    // During load, we try to get any data that exists from localStorage
    const storedResumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
    useEffect(() => {
        // Check if storedResumeData is an empty object
        const isDataStored = Object.keys(storedResumeData).length > 0;
    
        if (isDataStored) {
            setEmail(storedResumeData.email || "");
            setSkills(storedResumeData.skills || "");
            setEducation(storedResumeData.education || "");
            setWorkExperience(storedResumeData.workExperience || "");
        } else {
            console.log("No resume data found in localStorage");
        }
    }, []);

    const fileInputRef = useRef(null);

    const submitResume = async (e) => {
        e.preventDefault();

        // Your API call logic here which should receive the email, skills, work experience (education pending)
        console.log("File submitted:", file);

        // Set respective user profiles
        setEmail("Testing email2 set from UploadResume.jsx");
        setSkills("Testing skills2 set from UploadResume.jsx");
        setEducation("Testing education2 set from UploadResume.jsx");
        setWorkExperience("Testing work experience2 set from UploadResume.jsx");

        // Save into localStorage
        const resumeData = {
            email,
            skills,
            education,
            workExperience,
        };
        localStorage.setItem("resumeData", JSON.stringify(resumeData));

    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const removeFile = () => {
        setFile(null);
        fileInputRef.current.value = null; // Clear the file input field
    };

    return (
        <div className="bg-gray-800 text-white rounded-xl shadow-md p-6">
            <div className="mb-4">
                <h2 className="text-32px font-bold mb-2">Your Resume</h2>
                <div className="border-b border-gray-600"></div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <form className="flex flex-col" onSubmit={submitResume}>
                    <label className="my-2 gap-4 flex items-center justify-center bg-gray-500 rounded-xl p-4 text-white text-center cursor-pointer hover:bg-gray-600">
                        <img src={uploadResumeIcon} className="h-16 w-16" alt="Upload Resume" />
                        <p>Upload your resume to update your experience!</p>
                        <input
                            type="file"
                            className="hidden"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            ref={fileInputRef} // Set a ref to the file input element
                        />
                    </label>
                    {file && <p className="mt-2">Selected file: {file.name}</p>}
                    {file && (
                        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" type="submit">
                            Submit
                        </button>
                    )}
                </form>
            </div>
            {file && (
                <div className="flex flex-col mt-4">
                    <div className="flex justify-center">
                        <button className="px-4 py-2 bg-yellow-500 text-white rounded mr-2" onClick={() => fileInputRef.current.click()}>
                            Change Resume
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded mr-2" onClick={removeFile}>
                            Remove
                        </button>
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded"
                            onClick={() => window.open(URL.createObjectURL(file), '_blank')}>
                            Check my resume
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UploadResume;
