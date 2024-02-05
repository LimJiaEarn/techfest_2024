import UploadResume from "./UploadResume.jsx";
import MyExperience from "./MyExperience.jsx";
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
    <section className="flex flex-col items-center justify-center gap-[20px] w-4/5">
      <div className="w-4/5"> {/* Adjust the width as needed */}
        <UploadResume/>
      </div>
      <div className="w-4/5"> {/* Adjust the width as needed */}
        <MyExperience/>
      </div>
      <div>
        Update/Edit Job Preferences
      </div>

    </section>
  );
}

export default MyProfile;
