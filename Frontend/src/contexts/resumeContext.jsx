import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const useResumeContext = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {

    const [file, setFile] = useState(null);
    const [email, setEmail] = useState("");
    const [skills, setSkills] = useState([]);
    const [education, setEducation] = useState([]);
    const [workExperience, setWorkExperience] = useState([]);

    const values = {
        file,
        setFile,
        email,
        setEmail,
        skills,
        setSkills,
        education,
        setEducation,
        workExperience,
        setWorkExperience
    };

    return (
        <ResumeContext.Provider value={values}>
            {children}
        </ResumeContext.Provider>
    );
};