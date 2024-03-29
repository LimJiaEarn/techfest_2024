import { useRef } from "react";
import { useResumeContext } from "../contexts/resumeContext.jsx";

import uploadResumeIcon from "../assets/upload-resume.svg";

function UploadResume() {
  const {
    file,
    setFile,
    email,
    setEmail,
    skills,
    setSkills,
    education,
    setEducation,
    workExperience,
    setWorkExperience,
  } = useResumeContext();

  const fileInputRef = useRef(null);

  const submitResume = async (e) => {
    e.preventDefault();

    try {
      // Assuming 'file' is already defined in your component state
      const formData = new FormData();
      formData.append("file", file);

      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8080/api/resumes/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
        },
      });

      if (response.ok) {
        // Handle success
        const responseData = await response.json();
        console.log("Resume submitted successfully:", responseData);
        // Assuming the response contains the necessary data
        setEmail(responseData.email);
        setSkills(responseData.skills);
        setEducation(responseData.education);
        setWorkExperience(responseData.workExperiences);
      } else {
        // Handle error
        console.error("Error2 submitting resume:", response.statusText);
        // Handle any specific error cases here
      }
    } catch (error) {
      console.error("Error submitting resume:", error);
      // Handle any specific error cases here
      //hardcode response
      const responseData = {
        email: "test@gmail.com",
        skills: ["python", "javascript"],
        education: "Computer Science",
        workExperience: ["Intern at Microsoft"],
      };
      setEmail(responseData.email);
      setSkills(responseData.skills);
      setEducation(responseData.education);
      setWorkExperience(responseData.workExperience);
    }
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
            <img
              src={uploadResumeIcon}
              className="h-16 w-16"
              alt="Upload Resume"
            />
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
            <button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
      </div>
      {file && (
        <div className="flex flex-col mt-4">
          <div className="flex justify-center">
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
              onClick={() => fileInputRef.current.click()}
            >
              Change Resume
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded mr-2"
              onClick={removeFile}
            >
              Remove
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => window.open(URL.createObjectURL(file), "_blank")}
            >
              Check my resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadResume;
