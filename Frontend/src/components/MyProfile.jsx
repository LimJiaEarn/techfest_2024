import UploadResume from "./UploadResume.jsx";
import MyExperience from "./MyExperience.jsx";
import JobPreference from "./JobPreference.jsx"
import { useState } from "react";
import { useResumeContext, ResumeProvider } from "../contexts/resumeContext.jsx";

const MyProfile = () => {
  return (
    <ResumeProvider>
      <ProfilePage/>
    </ResumeProvider>
  );
}

const ProfilePage = () => {
  const { email, skills, education, workExperience } = useResumeContext();

  return (
    <section className="flex flex-col items-center justify-center gap-[20px] w-4/5 my-[50px]">
      <div className="w-4/5"> 
        <UploadResume/>
      </div>
      <div className="w-4/5"> 
        <MyExperience/>
      </div>

      <div className="w-4/5"> 
        <JobPreference/>
      </div>

    </section>
  );
}

export default MyProfile;
