import { useState } from "react";
import { useResumeContext } from "../contexts/resumeContext.jsx";

function MyExperience() {
    
    const { email, setEmail, skills, setSkills, education, setEducation, workExperience, setWorkExperience } = useResumeContext();
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [isEditingEducation, setIsEditingEducation] = useState(false);
    const [isEditingWorkExperience, setIsEditingWorkExperience] = useState(false);

    const clearEmail = () => {
        setEmail("");
    };

    const clearSkills = () => {
        setSkills("");
    };

    const clearEducation = () => {
        setEducation("");
    };

    const clearWorkExperience = () => {
        setWorkExperience("");
    };

    const handleEmailEdit = () => {
        setIsEditingEmail(true);
    };

    const handleSkillsEdit = () => {
        setIsEditingSkills(true);
    };

    const handleEducationEdit = () => {
        setIsEditingEducation(true);
    };

    const handleWorkExperienceEdit = () => {
        setIsEditingWorkExperience(true);
    };

    const handleSaveEmail = () => {
        setIsEditingEmail(false);
    };

    const handleSaveSkills = () => {
        setIsEditingSkills(false);
    };

    const handleSaveEducation = () => {
        setIsEditingEducation(false);
    };

    const handleSaveWorkExperience = () => {
        setIsEditingWorkExperience(false);
    };

    return (
        <div className="bg-gray-800 text-white rounded-xl shadow-md p-6">

            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">My Experience</h2>
                <div className="border-b border-gray-600"></div>
            </div>
            
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                {isEditingEmail ? (
                    <div className="flex items-center">
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-400 px-3 py-1 rounded mr-2 bg-gray-700 text-white focus:outline-none" />
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleSaveEmail}>Save</button>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-300">{email}</p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2" onClick={handleEmailEdit}>Edit</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2" onClick={clearEmail}>Clear Email</button>
                    </>
                )}
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                {isEditingSkills ? (
                    <div className="flex items-center">
                        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="border border-gray-400 px-3 py-1 rounded mr-2 bg-gray-700 text-white focus:outline-none" />
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleSaveSkills}>Save</button>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-300">{skills}</p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2" onClick={handleSkillsEdit}>Edit</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2" onClick={clearSkills}>Clear Skills</button>
                    </>
                )}
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                {isEditingEducation ? (
                    <div className="flex items-center">
                        <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} className="border border-gray-400 px-3 py-1 rounded mr-2 bg-gray-700 text-white focus:outline-none" />
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleSaveEducation}>Save</button>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-300">{education}</p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2" onClick={handleEducationEdit}>Edit</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2" onClick={clearEducation}>Clear Education</button>
                    </>
                )}
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
                {isEditingWorkExperience ? (
                    <div className="flex items-center">
                        <input type="text" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} className="border border-gray-400 px-3 py-1 rounded mr-2 bg-gray-700 text-white focus:outline-none" />
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleSaveWorkExperience}>Save</button>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-300">{workExperience}</p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2" onClick={handleWorkExperienceEdit}>Edit</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2" onClick={clearWorkExperience}>Clear Work Experience</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default MyExperience;
