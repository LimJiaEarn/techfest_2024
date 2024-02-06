import { useState, useEffect } from "react";
import { useResumeContext } from "../contexts/resumeContext.jsx";

const JobPreference = () => {
    const { jobPreferences, setJobPreference } = useResumeContext();
    const [selectedPreferences, setSelectedPreferences] = useState([...jobPreferences]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isEditing, setIsEditing] = useState(false);



    const updateJobPreference = async (e) => {

      e.preventDefault();
  
      const userData = {
        username: user,
        jobPreferences: jobPreferences,
      };
  
      try {

        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:8080/api/jobpreference", {
          method: "POST",
          body: userData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

  
        if (response.ok) {
          // Handle success
          const responseData = await response.json();
          console.log("Login data submitted successfully:", responseData);
          setFailLogin(false);
          // Store the accessToken and refreshToken in local storage
          localStorage.setItem("accessToken", responseData.accessToken);
          localStorage.setItem("userID", user);
          if (responseData.refreshToken) {
            // Store refreshToken if available
            localStorage.setItem("refreshToken", responseData.refreshToken);
          }
  
        } else {
          // Handle error
          const errorData = await response.json();
          console.error("Error submitting job preference data:", errorData);
        }
      } catch (error) {
        console.error("Error submitting job preference data:", error);
      } 
    };

    useEffect(() => {
        updateJobPreference();
      }, [jobPreferences]);

    console.log(jobPreferences);
    console.log(selectedPreferences);

    const jobCategories = [
        {
            category: "Healthcare",
            choices: ["Registered Nurse", "Physician Assistant", "Surgeon", "Medical Technologist", "Nurse Practitioner", "Pharmacist", "Physical Therapist", "Dental Hygienist", "Radiologic Technologist", "Occupational Therapist", "Speech-Language Pathologist", "Clinical Psychologist", "Emergency Medical Technician", "Optometrist", "Chiropractor", "Anesthesiologist", "Dietitian", "Medical Laboratory Scientist", "Respiratory Therapist", "Podiatrist"],
        },
        {
            category: "Finance",
            choices: ["Financial Analyst", "Accountant", "Investment Banker", "Actuary", "Financial Advisor", "Auditor", "Credit Analyst", "Tax Consultant", "Risk Manager", "Insurance Underwriter", "Mortgage Broker", "Financial Controller", "Economist", "Quantitative Analyst", "Compliance Officer", "Financial Planner", "Budget Analyst", "Treasury Analyst", "Forensic Accountant", "Payroll Specialist"],
        },
        {
            category: "Education",
            choices: ["Teacher (Elementary, Middle, High School)", "Professor", "School Counselor", "Librarian", "Educational Administrator", "Special Education Teacher", "Curriculum Developer", "Education Consultant", "Tutor", "Education Policy Analyst", "School Principal", "Instructional Designer", "Admissions Counselor", "ESL Teacher", "School Psychologist", "Learning Specialist", "Reading Specialist", "College Registrar", "Career Counselor", "Montessori Teacher"],
        },
        {
            category: "Marketing",
            choices: ["Marketing Manager", "Social Media Manager", "SEO Specialist", "Content Creator", "Brand Manager", "Digital Marketing Specialist", "Market Research Analyst", "Public Relations Specialist", "Advertising Copywriter", "Email Marketing Specialist", "Marketing Coordinator", "Media Planner", "Event Planner", "Product Marketing Manager", "Marketing Analyst", "Brand Strategist", "Marketing Director", "Influencer Marketing Manager", "CRM Manager", "Marketing Communications Manager"],
        },
        {
            category: "Engineering",
            choices: ["Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Chemical Engineer", "Aerospace Engineer", "Environmental Engineer", "Biomedical Engineer", "Petroleum Engineer", "Nuclear Engineer", "Industrial Engineer", "Materials Engineer", "Structural Engineer", "Process Engineer", "Systems Engineer", "Quality Engineer", "Geotechnical Engineer", "Water Resources Engineer", "Robotics Engineer", "HVAC Engineer", "Traffic Engineer"],
        },
        {
            category: "Technology",
            choices: ["Software Developer", "Network Administrator", "Database Administrator", "Systems Analyst", "Information Security Analyst", "Web Developer", "Cloud Architect", "IT Manager", "DevOps Engineer", "Machine Learning Engineer", "Cybersecurity Specialist", "Blockchain Developer", "Game Developer", "Data Engineer", "UI/UX Designer", "Computer Programmer", "Mobile App Developer", "Technical Support Specialist", "Embedded Systems Engineer", "Artificial Intelligence Engineer"],
        },
        {
            category: "Business",
            choices: ["Business Analyst", "Management Consultant", "Entrepreneur", "Project Manager", "Human Resources Manager", "Operations Manager", "Supply Chain Manager", "Financial Manager", "Sales Manager", "Customer Success Manager", "Business Development Manager", "Strategic Planner", "Risk Analyst", "Data Analyst", "Market Analyst", "Operations Analyst", "Quality Assurance Analyst", "Business Intelligence Analyst", "Procurement Specialist", "Change Management Specialist"],
        },
        {
            category: "Creative",
            choices: ["Graphic Designer", "Art Director", "Illustrator", "Animator", "Photographer", "Video Editor", "Copywriter", "Creative Director", "Fashion Designer", "Interior Designer", "User Interface Designer", "User Experience Designer", "Content Strategist", "Brand Strategist", "Motion Graphics Designer", "Game Designer", "Sound Designer", "Visual Effects Artist", "Creative Writer", "Marketing Designer"],
        },
        {
            category: "Hospitality",
            choices: ["Hotel Manager", "Restaurant Manager", "Event Planner", "Concierge", "Catering Manager", "Travel Agent", "Tour Guide", "Front Desk Clerk", "Sommelier", "Banquet Manager", "Resort Manager", "Guest Relations Manager", "Food and Beverage Manager", "Spa Manager", "Hospitality Director", "Venue Manager", "Hospitality Sales Manager", "Housekeeping Manager", "Night Auditor", "Gaming Manager"],
        },
        {
            category: "Legal",
            choices: ["Lawyer", "Legal Assistant", "Paralegal", "Legal Secretary", "Legal Consultant", "Legal Advisor", "Corporate Counsel", "Public Defender", "Judge", "Legal Analyst", "Legal Officer", "Legal Editor", "Legal Researcher", "Intellectual Property Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Contract Lawyer", "Environmental Lawyer", "Human Rights Lawyer"],
        }
    ];

    const handleTogglePreference = (preference) => {
        const updatedPreferences = selectedPreferences.includes(preference)
            ? selectedPreferences.filter((p) => p !== preference)
            : [...selectedPreferences, preference];
        setSelectedPreferences(updatedPreferences);
    };

    const handleSavePreferences = () => {
        setJobPreference(selectedPreferences);
        setIsEditing(false);
    };

    const handleResetPreferences = () => {
        setSelectedPreferences([]);
    };

    const handleCategorySelection = (category) => {
        setSelectedCategory(category);
    };

    const selectedCount = selectedPreferences.length;

    return (
        <div className="bg-gray-800 text-white rounded-xl shadow-md p-6">
            <div className="mb-4">
                <h2 className="text-32px font-bold mb-2">Job Preferences</h2>
                <div className="border-b border-gray-600"></div>
            </div>

            {isEditing ? (
                <div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Current Job Preferences</h3>
                        <ul className="text-gray-400">
                            {selectedPreferences.map((preference, index) => (
                                <li key={index}>{preference}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex mb-4 flex-wrap">
                        {jobCategories.map((category, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 mt-2 rounded ${
                                    selectedCategory === category.category ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                } mr-2`}
                                onClick={() => handleCategorySelection(category.category)}
                            >
                                {category.category}
                            </button>
                        ))}
                    </div>
                    {selectedCategory && (
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">{selectedCategory} Roles</h3>
                            <div className="flex flex-wrap gap-2">
                                {jobCategories
                                    .find((category) => category.category === selectedCategory)
                                    .choices.map((choice, idx) => (
                                        <button
                                            key={idx}
                                            className={`px-4 py-2 rounded ${
                                                selectedPreferences.includes(choice)
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            }`}
                                            onClick={() => handleTogglePreference(choice)}
                                        >
                                            {choice}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    )}
                    <div className="mb-4">
                        <p className="text-gray-400">Selected Preferences: {selectedCount}</p>
                    </div>
                    <div className="mb-4">
                        <button className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 mr-2" onClick={handleResetPreferences}>
                            Clear Preferences
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500" onClick={handleSavePreferences}>
                            Update Preferences
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-20px">Current Job Preferences</h3>
                    
                    {jobPreferences.length > 0 ? (
                    <ul className="text-gray-400">
                        {jobPreferences.map((preference, index) => (
                            <li key={index} className="text-18px">{preference}</li>
                        ))}</ul>) :
                    (<p>
                        Your have yet to set your job preferences
                    </p>
                    )}
                    
                    <button className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setIsEditing(true)}>
                        {jobPreferences.length > 0 ? (
                            <p>Edit Job Preferences</p>
                        ) : (
                            <p>Add Job Preferences</p>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobPreference;
