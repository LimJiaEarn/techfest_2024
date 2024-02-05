import UploadResume from "./UploadResume.jsx";
import MyExperience from "./MyExperience.jsx";
import JobPreference from "./JobPreference.jsx"
import { useEffect } from "react";
import { useResumeContext, ResumeProvider } from "../contexts/resumeContext.jsx";
import { useUser } from '../App';

const MyProfile = () => {

  const { userID } = useUser();

  return (
    <ResumeProvider>
      <ProfilePage userID={userID} />
    </ResumeProvider>
  );
}

const ProfilePage = ({userID}) => {
  const { email, skills, education, workExperience, jobPreferences } = useResumeContext();

  const API_LINK = "";

  const sendProfileUpdatesToAPI = async () => {
    try {
      const response = await fetch(API_LINK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID,
          email,
          skills,
          education,
          workExperience,
          jobPreferences
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Read response body as JSON
      const data = await response.json();
      console.log("Updating to API: ", data);
      // Handle response if needed
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Call the function to send profile updates whenever any of the profile data changes
  useEffect(() => {
    sendProfileUpdatesToAPI();
  }, [userID, email, skills, education, workExperience, jobPreferences]);

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
