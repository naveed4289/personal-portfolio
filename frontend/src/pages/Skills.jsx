import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Experience from './Experience';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [visibleSkills, setVisibleSkills] = useState(8);
    const BASE_URL = 'http://localhost:3000';

    const fetchSkills = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/getSkill`);
            if (!response.ok) {
                throw new Error('Error fetching skills');
            }
            const data = await response.json();
            console.log('Fetched Skills:', data); // Debugging line
            setSkills(data.response || []);
        } catch (error) {
            toast.error(error.message);
            console.error('Fetch error:', error);
        }
    };

    const handleShowMore = () => {
        setVisibleSkills(skills.length);
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div>
        <section className="w-full max-w-7xl mx-auto py-16 px-6">
            <div className="text-center mb-12">
                <h4 className="text-lg text-gray-400 font-bold">Skills Overview</h4>
                <h2 className="text-4xl font-bold text-white">Mastery in Various Technologies</h2>
                <p className="text-gray-400 mt-4">
                    Below are some of the technical skills I have mastered over the years, along with the level of proficiency in each.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {skills.slice(0, visibleSkills).map((skill) => (
                    <div 
                        key={skill._id} 
                        className="bg-[#1a1d3a] rounded-lg p-4 flex flex-col items-center justify-center hover:scale-105 transform transition duration-300"
                    >
                        <div className="mb-3">
                            <img src={`http://localhost:3000/${skill.icon}`} alt={skill.name} className="w-16 h-16" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                        <p className="text-gray-400">{skill.percentage}%</p>
                    </div>
                ))}
            </div>

            {visibleSkills < skills.length && (
                <div className="text-center mt-8">
                    <button 
                        onClick={handleShowMore} 
                        className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-200"
                    >
                        Show More
                    </button>
                </div>
            )}
        </section>
            <div><Experience/></div>
            </div>
    );
};

export default Skills;
