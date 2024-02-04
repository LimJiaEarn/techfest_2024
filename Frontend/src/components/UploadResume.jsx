import { useState, useRef } from "react";

function UploadResume() {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const submitResume = async (e) => {
        e.preventDefault();
        // Your API call logic here
        console.log("File submitted:", file);
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
        <div className="mb-5">
            <form className="flex flex-col" onSubmit={submitResume}>
                {/* Hide the default file input button */}
                <input
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    required
                    onChange={handleFileChange}
                    ref={fileInputRef} // Set a ref to the file input element
                />
                {/* Custom button to trigger file input click */}
                <label className="file-upload-btn ml-2 px-2 py-1 bg-blue-500 text-white rounded cursor-pointer">
                    Choose File
                    <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} ref={fileInputRef} />
                </label>
                {/* Display the file name if file is selected */}
                {file && <p className="mt-2">Selected file: {file.name}</p>}
                {file && <button className="ml-2 px-2 py-1 bg-green-500 text-white rounded" type="submit">
                    Submit
                </button>}
            </form>

            <div className="">
                {file && (
                    <div className="mt-3">
                        <button className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => fileInputRef.current.click()}>
                            Change Resume
                        </button>
                        <button className="ml-2 px-2 py-1 bg-red-500 text-white rounded" onClick={removeFile}>
                            Remove
                        </button>
                        <button className={`ml-2 px-2 py-1 bg-green-500 text-white rounded`} onClick={() => window.open(URL.createObjectURL(file), '_blank')}>
                            Check my resume
                        </button>
                    </div>
                )}
                
            </div>
        </div>
    );
}

export default UploadResume;
