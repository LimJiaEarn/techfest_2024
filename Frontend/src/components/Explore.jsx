import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useResumeContext, ResumeProvider } from "../contexts/resumeContext.jsx";


const Explore = () => {
  return(
  <ResumeProvider>
    <ExplorePage/>
  </ResumeProvider>
  )
}

const ExplorePage = () => {
  const { skills } = useResumeContext();
  console.log("User skills: ", skills);

  // State for job listings and other necessary data
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
      // Fetch job listings
      fetchJobListings();
  }, []);

  const fetchJobListings = async () => {
      try {
          // Hardcoded job listings for example purposes
          const jobListingsData = [
              {
                  id: 1,
                  company: 'Tech Solutions Inc.',
                  title: 'Software Engineer',
                  description: 'Seeking a skilled software engineer to develop innovative software solutions.',
                  requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
              },
              {
                  id: 2,
                  company: 'Digital Marketing Agency',
                  title: 'Digital Marketing Specialist',
                  description: 'Looking for a digital marketing specialist to drive online marketing efforts.',
                  requiredSkills: ['SEO', 'Social Media Marketing', 'Google Analytics', 'Content Marketing'],
              },
              // Add more job listings as needed
          ];
          setJobListings(jobListingsData);
      } catch (error) {
          console.error('Error fetching job listings:', error);
      }
  };

  // Ensure skills are available before rendering job listings
  if (skills.length === 0) {
      return (
          <div className="max-w-4xl mx-auto p-4 text-white">
              <div>Loading...</div>
          </div>
      );
  }

  return (
      <div className="max-w-4xl mx-auto p-4 text-white">
          <div className="space-y-8">
              {/* Render job listings with required skills and job descriptions */}
              {jobListings.map((job) => (
                  <div key={job.id} className="border border-gray-300 rounded p-4 bg-gray-800">
                      <h2 className="text-2xl font-bold text-blue-400 mb-2">{job.title}</h2>
                      <h3 className="text-lg font-semibold text-gray-400 mb-2">{job.company}</h3>
                      <p className="text-gray-400 mb-4">{job.description}</p>
                      <div className="mb-4">
                          <h4 className="text-lg font-semibold text-gray-400">Matched Skillsets:</h4>
                          <div className="flex flex-wrap gap-2">
                              {job.requiredSkills.map((skill) => (
                                  skills.includes(skill) && (
                                      <div key={skill} className="bg-green-600 text-gray-200 py-1 px-2 rounded">
                                          {skill}
                                      </div>
                                  )
                              ))}
                          </div>
                      </div>
                      <div>
                          <h4 className="text-lg font-semibold text-gray-400">Missing Skillsets:</h4>
                          <div className="flex flex-wrap gap-2">
                              {job.requiredSkills.map((skill) => (
                                  !skills.includes(skill) && (
                                      <div key={skill} className="bg-red-600 text-gray-200 py-1 px-2 rounded">
                                          {skill}
                                      </div>
                                  )
                              ))}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
          {/* Button to link user to MyProfile page if job preferences are not set */}
          {skills.length === 0 && (
              <div className="mt-8">
                  <Link to="/myprofile">
                      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                          Add Job Preferences
                      </button>
                  </Link>
              </div>
          )}
      </div>
  );
};


export default Explore;
