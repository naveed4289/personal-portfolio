import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Download() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
        <div >
            <div >
                {resumes.map((resume, index) => {
                    return (
                        <div key={index} >
                            <button
                                type="button"
                                onClick={() => downloadResume(resume._id)} 
                                className="resume-button" // Updated className
                                title="Download Resume"
                            >
                                 Download Resume
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Download;
