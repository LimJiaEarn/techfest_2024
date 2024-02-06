import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useResumeContext } from "../contexts/resumeContext.jsx";
import upArrow from "../assets/upArrow.svg";
import downArrow from "../assets/downArrow.svg";
import { useUser } from '../App';

const Explore = () => {
  const { skills, jobPreferences } = useResumeContext();
  
  const [jobListings, setJobListings] = useState([]);
  const [AIMessage, setAIMessage] = useState("");
  const [typedMessage, setTypedMessage] = useState("");
  const jobListRef = useRef(null);

  useEffect(() => {
    fetchJobListings();
    fetchAIMsg();
  }, []);

  const { setCurrentPage } = useUser();

  const fetchAIMsg = async () => {
    // hardcoded in
    try {
        const hardcodedMessage = "FFantastic job on acquiring in-demand skills like REST API and C#! It's evident that you're actively investing in your professional growth. As you continue your journey, consider allocating some time to enhance your proficiency in SQL and Python, two highly sought-after skills in today's job market. With your determination and commitment to improvement, mastering these technologies will open up even more opportunities and broaden your career prospects. Keep up the great work, and remember, every step you take towards skill enhancement brings you closer to your career aspirations! You've got this!";
          
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
          company: "TikTok",
          title: "Software Engineer (Cloud Infrastructure)",
          salary: '-',
          description: "Looking for a Software Engineer to join the messaging middleware team, responsible for developing and advancing a messaging platform.",
          requiredSkills: [
            "C","C++","Go","Python",
            "Operating Systems",
            "Kafka","NSQ","RocketMQ","Pulsar"]
        },
        {
          id: 2,
          company: 'Software Engineer (Backend)',
          title: 'Shopback, Singapore',
          salary: '-',
          description: 'Contribute to the ideation, technical design, implementation, and testing of product features.',
          requiredSkills: ['REST API', 'Technical Design', 'Product Testing'],
        },
        {
          id: 3,
          company: 'UBS, Singapore',
          title: 'C# Software Engineer',
          salary: '-',
          description: 'Design, develop, and improve the digital products and technology services we provide to our clients and employees',
          requiredSkills: ['SQL', 'C#', '.NET', 'Agile'],
        },
        {
          id: 4,
          company: 'GIC, Singapore',
          title: 'Software Developer',
          salary: '-',
          description: 'Perform hands-on analysis of the technical, data and business functions and devise implementation plans',
          requiredSkills: ['Unix', 'SQL', 'Docker', 'Python', 'Javascript', 'ReactJS'],
        },
        {
          id: 5,
          company: 'Illumina, Singapore',
          title: 'Software Engineer',
          salary: '-',
          description: 'Responsible for designing, developing, testing, and maintaining software applications',
          requiredSkills: ['Java', 'C#', 'Angular', 'AWS-RDS', 'SQL', 'REST API'],
        },
      ];
          
      setJobListings(jobListingsData);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  const typeMessage = (message) => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedMessage((prevMessage) => prevMessage + message.charAt(index));
      index++;
      if (index === message.length) {
        clearInterval(typingInterval);
      }
    }, 200); 
  };

  useEffect(() => {
    if (AIMessage) {
      typeMessage(AIMessage);
    }
  }, [AIMessage]);

  if (jobPreferences.length === 0) {
    return (
      <div className="flex flex-col items-center max-w-4xl mx-auto p-4 text-white">
        <div className="text-18px">
          You do not have job preferences setup!<br/> Go to your profile and set up first!
        </div>
        <div className="mt-8">
          <Link to="/myprofile">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={()=> setCurrentPage("My Profile")}>
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

  // Convert matched skill counts to an array of objects for sorting
  const matchedSkillsSorted = Object.entries(matchedSkillCounts)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);

  // Convert missing skill counts to an array of objects for sorting
  const missingSkillsSorted = Object.entries(missingSkillCounts)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);
  
  const scrollToNextListing = (direction) => {
    if (jobListRef.current) {
      const scrollAmount = direction === 'up' ? -300 : 300;
      jobListRef.current.scrollTop += scrollAmount;
    }
  };

  return (
    <div className="flex md:flex-row-reverse flex-col w-full max-w-[1200px] mx-auto p-4 gap-[30px] text-white">

      <div className="flex-1 flex flex-col justify-start">

        <div className="flex-0 m-0">
            <h1 className="text-32px font-bold text-gradient text-center mb-4"> Your Skills Matches</h1>
            <div className="flex justify-between items-center ">
                <div className="bg-gray-800 p-4 rounded ">
                    <div className="mb-4">
                        <h3 className="text-24px text-center font-semibold text-gray-400">Matched Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {matchedSkillsSorted.map(({ skill, count }) => (
                            <div key={skill} className="bg-green-600 text-gray-200 py-1 px-2 rounded">
                                {skill} (x{count})
                            </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-24px text-center font-semibold text-gray-400">Missing Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {missingSkillsSorted.map(({ skill, count }) => (
                            <div key={skill} className="bg-red-600 text-gray-200 py-1 px-2 rounded">
                                {skill} (x{count})
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex-1 mt-4">
            <h1 className="text-32px font-bold text-gradient text-center mb-4">
                Our AI Recommendation
            </h1>
            <div className="bg-gray-800 font-roboto text-gray-400 text-20px p-4 rounded">
                <p>{typedMessage}</p>
            </div>
        </div>

      </div>

      <div className="flex-1 h-[800px] items-center justify-center">
        <h1 className="text-32px font-bold text-gradient text-center mb-4">
          Explore Our Curated Job Search
        </h1>

        <div className="flex flex-row gap-[20px]">
        <div className="flex flex-col justify-center gap-[15px]">
            <button className="bg-blue-500 text-white hover:bg-blue-600 rounded-full w-[45px] h-[45px]" onClick={() => scrollToNextListing('up')}>
              <img src={upArrow} alt="Up arrow" />
            </button>
            <button className="bg-blue-500 text-white hover:bg-blue-600 rounded-full w-[45px] h-[45px]" onClick={() => scrollToNextListing('down')}>
              <img src={downArrow} alt="Down arrow" />
            </button>
          </div>   
          <div className="max-h-[680px] overflow-y-auto space-y-8 scrollbar-hide" ref={jobListRef} style={{ scrollBehavior: 'smooth' }}>
          {jobListings.map((job) => (
            <div key={job.id} className="border border-gray-300 rounded p-4 bg-gray-800">
              <h2 className="text-2xl font-bold text-blue-400 mb-2">{job.title}</h2>
              <h3 className="text-lg font-semibold text-gray-400 mb-2">{job.company}</h3>
              <p className="text-gray-400 mb-4">{job.description}</p>
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-400">Matched Skillsets:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill) => (
                    skills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase()) && (
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
                    !skills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase()) && !jobPreferences.includes(skill) && (
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
    </div>
  );
};

export default Explore;
