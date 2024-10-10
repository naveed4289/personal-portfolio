import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://localhost:3000'; // Base URL for images

const Project = () => {
    const [projects, setProjects] = useState([]); // Store project data
    const [visibleProjects, setVisibleProjects] = useState(4); // Initially show 4 projects
    const [error, setError] = useState(''); // Error state

    // Fetch projects from the API
    const fetchProjects = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/getProject`);
            const data = await response.json();
            if (data.response) {
                setProjects(data.response); // Set the projects state
            } else {
                throw new Error('No projects found');
            }
        } catch (err) {
            setError('Error fetching projects: ' + err.message);
            toast.error(err.message); // Show error message
            console.error(err); // Log the error to console
        }
    };

    // Fetch projects when the component mounts
    useEffect(() => {
        fetchProjects();
    }, []);

    const handleShowMore = () => {
        setVisibleProjects(projects.length); // Show all projects on button click
    };

    return (
        <div className="text-gray-100">
            <div className="text-center mb-12">
                <h4 className="text-sm text-gray-400 font-semibold uppercase tracking-wide">Latest Works</h4>
                <h2 className="text-4xl font-extrabold text-purple-500">Explore My Popular <br /> Projects</h2>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {projects.slice(0, visibleProjects).map((project) => (
                    <div 
                        key={project.id} 
                        className="bg-gray-800 rounded-lg p-6 hover:scale-105 transform transition duration-300 shadow-lg"
                    >
                        <img src={`http://localhost:3000/${project.image}`} alt={project.title} className="w-full h-52 object-cover mb-6 rounded-md" />
                        <h3 className="text-2xl font-semibold text-white text-center mb-2">{project.name}</h3>
                        <p className="text-gray-400 text-center">{project.desc}</p>
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            {visibleProjects < projects.length && (
                <div className="text-center mt-12">
                    <button 
                        onClick={handleShowMore} 
                        className="bg-purple-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition duration-300"
                    >
                        Show More
                    </button>
                </div>
            )}

            {/* Error message display */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
};

export default Project;
