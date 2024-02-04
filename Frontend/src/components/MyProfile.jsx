import UploadResume from "./UploadResume.jsx";
import { useState } from "react";
import { useResumeContext, ResumeProvider } from "../contexts/resumeContext.jsx";


const MyProfile = () => {

  return (
    <ResumeProvider>
      <ProfilePage/>

  </ResumeProvider>
  )
}


const ProfilePage = () => {

  // const { values } = useResumeContext();
  const { email, skills, education, workExperience } = useResumeContext();

  return (
    <section className="flex flex-col items-center justify-center">
      
      <UploadResume/>

      <div className="flex flex-col">
        <p> Testing Data</p>
        <div>
          {email}
        </div>
        <div>
          {skills}
        </div>
        <div>
          {education}
        </div>
        <div>
          {workExperience}
        </div>
      </div>


      <div>
          Update/Edit Experience
      </div>

      <div>
          Update/Edit Job Preferences
      </div>


    </section>

  )
  }
  
  export default MyProfile
  