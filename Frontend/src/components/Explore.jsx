import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useResumeContext } from "../contexts/resumeContext.jsx";

const Explore = () => {
  const { skills, jobPreferences } = useResumeContext();
  console.log("User skills: ", skills);
  
  const [jobListings, setJobListings] = useState([]);
  const [AIMessage, setAIMessage] = useState("");


  useEffect(() => {
    fetchJobListings();
    fetchAIMsg();
  }, []);


  const fetchAIMsg = async () => {
    // hardcoded in
    try {
        const hardcodedMessage = "You should study harder";
          
          
        setAIMessage(hardcodedMessage);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };
  

  const fetchJobListings = async () => {
    // hardcoded in
    try {
        const jobListingsData = [
            {
              id: 1,
              company: 'Tech Solutions Inc.',
              title: 'Software Engineer',
              salary: '5500',
              description: 'Seeking a skilled software engineer to develop innovative software solutions.',
              requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Google Analytics'],
            },
            {
              id: 2,
              company: 'Digital Marketing Agency',
              title: 'Digital Marketing Specialist',
              salary: '5500',
              description: 'Looking for a digital marketing specialist to drive online marketing efforts.',
              requiredSkills: ['SEO', 'Social Media Marketing', 'Google Analytics', 'Content Marketing'],
            },
            {
              id: 3,
              company: 'E-commerce Startup',
              title: 'Frontend Developer',
              salary: '6000',
              description: 'Join our dynamic team as a frontend developer to create stunning user interfaces.',
              requiredSkills: ['JavaScript', 'React', 'CSS', 'HTML', 'Responsive Design'],
            },
            {
              id: 4,
              company: 'Healthcare Services',
              title: 'Healthcare Data Analyst',
              salary: '6000',
              description: 'Seeking a data analyst to analyze and interpret healthcare data for insights and trends.',
              requiredSkills: ['Data Analysis', 'SQL', 'Python', 'Healthcare Domain Knowledge'],
            },
            {
              id: 5,
              company: 'Financial Services Firm',
              title: 'Financial Analyst',
              salary: '6000',
              description: 'Looking for a financial analyst to perform financial forecasting and risk analysis.',
              requiredSkills: ['Financial Modeling', 'Risk Management', 'Accounting', 'Excel'],
            },
          ];
          
          
      setJobListings(jobListingsData);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  if (jobPreferences.length === 0) {
    return (
      <div className="flex flex-col items-center max-w-4xl mx-auto p-4 text-white">
        <div className="text-18px">
          You do not have job preferences setup!<br/> Go to your profile and set up first!
        </div>
        <div className="mt-8">
          <Link to="/myprofile">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Add Job Preferences
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Count matched and missing skills for each job listing
  const matchedSkillCounts = {};
  jobListings.forEach(job => {
    job.requiredSkills.forEach(skill => {
      const lowercaseSkill = skill.toLowerCase(); // Convert to lowercase
      if (skills.some(userSkill => userSkill.toLowerCase() === lowercaseSkill)) {
        matchedSkillCounts[skill] = (matchedSkillCounts[skill] || 0) + 1;
      }
    });
  });

  // Count missing skills for each job listing
  const missingSkillCounts = {};
  jobListings.forEach(job => {
    job.requiredSkills.forEach(skill => {
      const lowercaseSkill = skill.toLowerCase(); // Convert to lowercase
      if (!skills.some(userSkill => userSkill.toLowerCase() === lowercaseSkill) && !jobPreferences.includes(skill)) {
        missingSkillCounts[skill] = (missingSkillCounts[skill] || 0) + 1;
      }
    });
  });

  return (
    <div className="flex md:flex-row-reverse flex-col max-w-4xl mx-auto p-4 gap-[30px] text-white">

      <div className="flex-1 flex flex-col justify-start">

        <div className="flex-0 m-0">

            <h1 className="text-32px font-bold text-gradient text-center mb-4"> Your Skills Matches</h1>
            <div className="flex justify-between items-center ">
                
                <div className="bg-gray-800 p-4 rounded ">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-400">Matched Skills:</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(matchedSkillCounts).map(([skill, count]) => (
                            <div key={skill} className="bg-green-600 text-gray-200 py-1 px-2 rounded">
                                {skill} (x{count})
                            </div>
                            ))}
                        </div>
                        </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-400">Missing Skills:</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(missingSkillCounts).map(([skill, count]) => (
                            <div key={skill} className="bg-red-600 text-gray-200 py-1 px-2 rounded">
                                {skill} (x{count})
                            </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div className="flex-1">
            <h1 className="text-32px font-bold text-gradient text-center mb-4">
                Our AI Reccomendation
            </h1>
            <div className="bg-gray-800 text-white p-4 rounded">
                <p>{AIMessage}</p>
            </div>
        </div>

      </div>

      <div className="flex-1">

        <h1 className="text-32px font-bold text-gradient text-center mb-4">
          Explore Our Curated Job Search
        </h1>

        <div className="space-y-8">
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
                    !skills.includes(skill) && !jobPreferences.includes(skill) && (
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
      </div>
    </div>
  );
};

export default Explore;
