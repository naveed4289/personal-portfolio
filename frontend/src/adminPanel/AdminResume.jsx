import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck, FaTimes, FaDownload } from 'react-icons/fa';

function AdminResume() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newResume, setNewResume] = useState(null);

    // Fetch resume data from the API
    const getResumeData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:3000/api/admin/resume/data');
            if (!response.ok) throw new Error('Failed to fetch resumes');
            const data = await response.json();
            setResumes(data.response);
        } catch (err) {
            setError('Could not load resumes, please try again.');
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update the selected resume
    const updateResume = async (id) => {
        if (!newResume) {
            toast.error('Please select a resume to upload!');
            return;
        }

        const formData = new FormData();
        formData.append('resume', newResume);

        try {
            const response = await fetch(`http://localhost:3000/api/admin/resume/update/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Failed to update resume');

            toast.success('Resume updated successfully');
            setNewResume(null);
            getResumeData();
        } catch (err) {
            toast.error(err.message);
        }
    };

    // Download resume without refreshing the page
    const downloadResume = (id) => {
        const resumeUrl = `http://localhost:3000/api/admin/resume/${id}`;
        const a = document.createElement('a');
        a.href = resumeUrl;
        a.download = ''; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); 
    };

    // Run getResumeData on component mount
    useEffect(() => {
        getResumeData();
    }, []);

    // Display loading state
    if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;

    // Display error if it exists
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="p-4 h-full">
            <div className="h-full rounded-[8px] bg-[#18214A] p-6 flex flex-col items-center justify-around shadow-lg transition-transform transform hover:scale-105">
                {resumes.map((resume, index) => {
                    const resumeUrl = resume.resume ? `http://localhost:3000/${resume.resume.replace(/\\/g, '/')}` : '';

                    return (
                        <div key={index} className="text-center flex flex-col items-center justify-center space-y-4 w-full">
                            <iframe
                                src={resumeUrl}
                                width="100%"
                                height="200"
                                title="Resume Viewer"
                                className="border rounded cursor-pointer"
                                onClick={() => window.open(resumeUrl, '_blank')}
                            />
                            <input
                                type="file"
                                onChange={(e) => setNewResume(e.target.files[0])}
                                className="border border-gray-300 rounded w-full p-2 mb-4 text-white"
                            />
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => updateResume(resume._id)}
                                    className="bg-[#080A35] text-white rounded p-2"
                                    title="Update Resume"
                                >
                                    <FaCheck />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setNewResume(null)}
                                    className="bg-[#080A35] text-white rounded p-2"
                                    title="Cancel"
                                >
                                    <FaTimes />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => downloadResume(resume._id)} 
                                    className="bg-[#080A35] text-white rounded p-2"
                                    title="Download Resume"
                                >
                                    <FaDownload />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminResume;
