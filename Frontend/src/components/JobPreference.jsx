import { useState } from "react";
import { useResumeContext } from "../contexts/resumeContext.jsx";

const JobPreference = () => {
    const { jobPreferences, setJobPreference } = useResumeContext();
    const [selectedPreferences, setSelectedPreferences] = useState([...jobPreferences]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const jobCategories = [
        {
            category: "Service",
            choices: ["Hotel Manager", "Customer Service Representative", "Tour Guide", "Event Coordinator"],
        },
        {
            category: "Tech",
            choices: ["Software Engineer", "Data Scientist", "UX/UI Designer", "Product Manager", "Full Stack Developer"],
        },
        // Add more categories and choices as needed
    ];

    const handleTogglePreference = (preference) => {
        const updatedPreferences = selectedPreferences.includes(preference)
            ? selectedPreferences.filter((p) => p !== preference)
            : [...selectedPreferences, preference];
        setSelectedPreferences(updatedPreferences);
    };

    const handleSavePreferences = () => {
        setJobPreference(selectedPreferences);
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
                <h2 className="text-2xl font-bold mb-2">Job Preferences</h2>
                <div className="border-b border-gray-600"></div>
            </div>
            <div className="flex mb-4">
                {jobCategories.map((category, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded ${
                            selectedCategory === category.category ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
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
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-700 text-gray-300"
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
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2" onClick={handleResetPreferences}>
                    Reset Preferences
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSavePreferences}>
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default JobPreference;
