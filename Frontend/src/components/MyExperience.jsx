import { useState, useEffect } from "react";
import { useResumeContext } from "../contexts/resumeContext.jsx";


function MyExperience() {
    
    const { email, setEmail, skills, setSkills, education, setEducation, workExperience, setWorkExperience } = useResumeContext();
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [isEditingEducation, setIsEditingEducation] = useState(false);
    const [isEditingWorkExperience, setIsEditingWorkExperience] = useState(false);

    const [curEmail , setCurEmail] = useState(email);
    const [curSkills , setCurSkills] = useState(skills);
    const [curEducation , setCurEducation] = useState(education);
    const [curWorkExperience , setCurWorkExperience] = useState(workExperience);

    useEffect(() => {
        setCurEmail(email);
        }, [email]);

    useEffect(() => {
        setCurSkills(skills);
        }, [skills]);
    
    useEffect(() => {
        setCurEducation(education);
        }, [education]);

    useEffect(() => {
        setCurWorkExperience(workExperience);
        }, [workExperience]);

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
        setEmail(curEmail);
    };

    const handleSaveSkills = () => {
        setIsEditingSkills(false);
        setSkills(curSkills);
    };

    const handleSaveEducation = () => {
        setIsEditingEducation(false);
        setEducation(curEducation);
    };

    const handleSaveWorkExperience = () => {
        setIsEditingWorkExperience(false);
        setWorkExperience(curWorkExperience);
    };

    const clearEmail = () => {
        setEmail("");
        setCurEmail("");
    };

    const clearSkills = () => {
        setSkills([]);
        setCurSkills([]);
    };

    const clearEducation = () => {
        setEducation("");
        setCurEducation("");
    }
    const clearWorkExperience = () => {
        setWorkExperience("");
        setCurWorkExperience("");
    };

    return (
        <div className="bg-gray-800 text-white rounded-xl shadow-md p-6">

            <div className="mb-4">
                <h2 className="text-32px font-bold mb-2">My Experience</h2>
                <div className="border-b border-gray-600"></div>
            </div>
            
            <div className="mb-4 mt-6">
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                {isEditingEmail ? (
                    <div className="flex items-center">
                        <input type="text" value={curEmail} onChange={(e) => setCurEmail(e.target.value)} className="border border-gray-400 px-3 py-1 rounded mr-2 bg-gray-700 text-white focus:outline-none w-full" />
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleSaveEmail}>Save</button>
                    </div>
                ) : (
                    <div className="mt-2">
                        <p className="text-gray-300">{curEmail}</p>
                        <div className="mt-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2" onClick={handleEmailEdit}>Edit</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2" onClick={clearEmail}>Clear Email</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-4 mt-6">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                {isEditingSkills ? (
                    <div className="flex items-center">
                        <input type="text" value={curSkills.join(',')} onChange={(e) => setCurSkills(e.target.value.split(','))} className="border border-gray-400 px-3 py-1 rounded mr-2 bg-gray-700 text-white focus:outline-none w-full" />
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleSaveSkills}>Save</button>
                    </div>
                ) : (
                    <div className="mt-2">
                        <p className="text-gray-300">{curSkills.join(',')}</p>
                        <div className="mt-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2" onClick={handleSkillsEdit}>Edit</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2" onClick={clearSkills}>Clear Skills</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-4 mt-6">
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                {isEditingEducation ? (
                    <div className="flex items-center">
                        <input type="text" value={curEducation} onChange={(e) => setCurEducation(e.target.value)} className="border border-gray-400 px-3 py-1 rounded mr-2 bg-gray-700 text-white focus:outline-none w-full" />
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleSaveEducation}>Save</button>
                    </div>
                ) : (
                    <div className="mt-2">
                        <p className="text-gray-300">{curEducation}</p>
                        <div className="mt-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2" onClick={handleEducationEdit}>Edit</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2" onClick={clearEducation}>Clear Education</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-4 mt-6">
                <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
                {isEditingWorkExperience ? (
                    <div className="flex items-center">
                        <input type="text" value={curWorkExperience} onChange={(e) => setCurWorkExperience(e.target.value)} className="border border-gray-400 px-3 py-1 rounded mr-2 bg-gray-700 text-white focus:outline-none w-full" />
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleSaveWorkExperience}>Save</button>
                    </div>
                ) : (
                    <div className="mt-2">
                        <p className="text-gray-300">{curWorkExperience}</p>
                        <div className="mt-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2" onClick={handleWorkExperienceEdit}>Edit</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2" onClick={clearWorkExperience}>Clear Work Experience</button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default MyExperience;
