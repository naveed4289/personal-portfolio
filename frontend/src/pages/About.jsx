import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaEnvelope, FaPhone } from 'react-icons/fa';
import Skills from './Skills';


function About() {
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [skills, setSkills] = useState([]);
    const [skillData, setSkillData] = useState({
        yearsOfExperience: '',
        completedProjects: '',
        clientSatisfaction: ''
    });

    const fetchSkillsData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/getRole', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (Array.isArray(data.response)) {
                setSkills(data.response.slice(0, 4)); // Slice to get the top 4 skills
            } else {
                setError('Unexpected data format received from server.');
            }
        } catch (err) {
            setError('Error fetching skills data');
        }
    };

    useEffect(() => {
        fetchSkillsData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/get/userData');
            if (response.ok) {
                const data = await response.json();
                setUserData(data.response[0]);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const getImageData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:3000/api/admin/image/data');
            if (!response.ok) throw new Error('Failed to fetch images');
            const data = await response.json();
            setProducts(data.response);
        } catch (err) {
            setError('Could not load images, please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchSkillData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/getSkillYear');
            const data = await response.json();


            if (data.response && data.response.length > 0) {
                const skills = data.response[0];
                setSkillData({
                    yearsOfExperience: skills.yearsOfExperience || 'N/A',
                    completedProjects: skills.completedProjects || 'N/A',
                    clientSatisfaction: skills.clientSatisfaction || 'N/A'
                });
            } else {
                console.warn('No skill data available.');
            }
        } catch (error) {
            console.error('Error fetching skill data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        getImageData();
        fetchSkillData(); // Fetch experience data here
    }, []);

    useEffect(() => {
        if (!loading) {
            setIsVisible(true);
        }
    }, [loading]);

    if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!userData) return <div className="text-center text-red-500">User data not found.</div>;

    const overviewParagraphs = userData.overview.split('\n\n');
    if (overviewParagraphs.length === 1 && overviewParagraphs[0] === '') {
        return <div className="text-center text-gray-500">No overview available.</div>;
    }

    return (
        <div className={`mb-40 ${isVisible ? 'fade-in' : 'opacity-0'} transition-opacity duration-500`}>
            <h2 className="text-white font-extrabold text-[40px] text-center mb-10 mt-10 md:text-[65px]">About Me</h2>
            <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-40 z-0"></div>
                <div className="relative z-10 flex flex-col md:flex-row">
                    {/* Left Section */}
                    <div className="w-full md:w-[65%] flex flex-col items-start px-4 mb-8">
                        <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 text-2xl md:text-5xl font-bold mb-4 text-left">
                            Professional Problem Solutions For Digital Products
                        </h3>

                        <div className="mb-6">
                            {overviewParagraphs.map((paragraph, index) => (
                                <p key={index} className="text-white text-sm sm:text-base md:text-lg mb-6 text-left">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Skills Section */}
                        <div className="flex flex-wrap mb-4">
                            {skills.map((skill) => (
                                <div
                                    key={skill._id} // Use unique key for each skill
                                    className="flex items-center w-1/2 mb-4 p-2 text-lg transition-all duration-300 hover:text-yellow-400"
                                >
                                    <FaCheckCircle
                                        className="text-gradient mr-2"
                                        style={{
                                            color: 'white',
                                            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                                            WebkitBackgroundClip: 'text',
                                        }}
                                    />
                                    <span className="text-white text-lg md:text-xl">
                                        {skill.role} {/* Render the role from the object */}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col md:flex-row bg-gray-900 bg-opacity-80 rounded-lg p-6 w-full justify-around items-center mt-4 shadow-lg">
                            <div className="flex items-center text-lg transition-all duration-300 hover:bg-transparent rounded-full p-2">
                                <FaEnvelope className="mr-2 text-white group-hover:text-purple-500 transition duration-300" />
                                <span className="text-white group-hover:text-purple-500 transition duration-300">{userData.email}</span>
                            </div>
                            <div className="flex items-center text-lg transition-all duration-300 hover:bg-transparent rounded-full p-2">
                                <FaPhone className="mr-2 text-white group-hover:text-purple-500 transition duration-300" />
                                <span className="text-white group-hover:text-purple-500 transition duration-300">{userData.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section (Profile Image) */}
                    <div className="w-full md:w-[35%] flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={`http://localhost:3000/${products[0]?.image.replace(/\\/g, '/')}`}
                                alt={userData.username}
                                className="h-[450px] w-[350px] rounded-lg object-cover shadow-lg"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 bg-opacity-70 text-center rounded-b-lg">
                                <span className="text-white text-2xl font-bold">{userData.username}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experience Section */}
                <div className="flex flex-col md:flex-row justify-around items-center mt-10 text-white p-4 rounded-lg">
                    <div className="flex flex-col items-center mb-4">
                        <span className="text-2xl font-bold">{skillData.yearsOfExperience}+</span>
                        <span className="text-3xl">Years of Experience</span>
                    </div>
                    <div className="border-l-2 border-white h-16 mx-4"></div>
                    <div className="flex flex-col items-center mb-4">
                        <span className="text-2xl font-bold">{skillData.completedProjects}+</span>
                        <span className="text-3xl">Completed Projects</span>
                    </div>
                    <div className="border-l-2 border-white h-16 mx-4"></div>
                    <div className="flex flex-col items-center mb-4">
                        <span className="text-2xl font-bold">{skillData.clientSatisfaction}%</span>
                        <span className="text-3xl">Client Satisfaction</span>
                    </div>
                </div>
            </div>
            {/* Responsive Styles */}
            <style >{`
                @media (max-width: 768px) {
                    h2 {
                        font-size: 2rem; // Responsive heading size
                    }
                    .md\\:w-[35%] {
                        width: 100%; // Full width on mobile
                    }
                    .md\\:w-[65%] {
                        width: 100%; // Full width on mobile
                    }
                    .mb-8 {
                        margin-bottom: 2rem; // Spacing adjustments
                    }
                    img {
                        height: auto; // Auto height for images
                        width: 100%; // Full width for images
                    }
                }
            `}</style>
            <div><Skills /></div>
      
        </div>
    );
}

export default About;
