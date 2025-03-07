import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSkillYear from './AdminSkillYear';

function AdminSkill() {
    const [skills, setSkills] = useState([]); // Store skill data
    const [icon, setIcon] = useState(null); // New icon file
    const [name, setName] = useState(''); // Skill name
    const [percentage, setPercentage] = useState(''); // Skill percentage
    const [error, setError] = useState(''); // Error state
    const [preview, setPreview] = useState(''); // Image preview

    const BASE_URL = 'http://localhost:3000'; // Base URL for images

    // Fetch skills from the API
    const fetchSkills = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/getSkill`);
            const data = await response.json();
            setSkills(data.response || []);
        } catch (err) {
            setError('Error fetching skills');
            toast.error(err.message); // Show error message
        }
    };

    // Add a new skill
    const addSkill = async (e) => {
        e.preventDefault();
        if (!icon || !name || !percentage) {
            setError('Please fill in all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('image', icon);
        formData.append('name', name);
        formData.append('percentage', percentage);

        try {
            const response = await fetch(`${BASE_URL}/api/admin/addSkill`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('Skill added successfully');
                fetchSkills(); // Refresh the skill list
                setIcon(null);
                setName('');
                setPercentage('');
                setPreview('');
                setError('');
            } else {
                throw new Error('Failed to add skill.');
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message); // Show error message
        }
    };

    // Delete a skill
    const deleteSkill = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/deleteSkill/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Skill deleted successfully');
                fetchSkills(); // Refresh the skill list
            } else {
                throw new Error('Failed to delete skill.');
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message); // Show error message
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIcon(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Manage Skills</h2>
    
        <form onSubmit={addSkill} className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring focus:ring-purple-400 bg-transparent"
                    required
                />
                <input
                    type="text"
                    placeholder="Skill Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring focus:ring-purple-400 flex-1 mx-2 mt-2 md:mt-0"
                    required
                />
                <input
                    type="number"
                    placeholder="Percentage"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="p-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring focus:ring-purple-400 flex-1 mx-2 mt-2 md:mt-0"
                    required
                />
                <button
                    type="submit"
                    className="bg-purple-700 hover:bg-purple-800 p-3 rounded-lg text-lg transition duration-200 mt-2 md:mt-0"
                >
                    Add Skill
                </button>
            </div>
            {error && <p className="text-red-400 text-center">{error}</p>}
        </form>
    
        {preview && (
            <div className="mb-4">
                <h3 className="text-lg text-center">Image Preview:</h3>
                <img src={preview} alt="Selected Skill" className="w-32 h-32 rounded-lg mx-auto" />
            </div>
        )}
    
        {/* Make this div scrollable */}
        <div className="max-h-72 overflow-y-auto">
            <table className="w-full bg-gray-700 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="p-4 text-left">Icon</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Percentage</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill) => (
                        <tr key={skill._id} className="hover:bg-gray-600 transition duration-200">
                            <td className="p-4">
                                <img
                                    src={`http://localhost:3000/${skill.icon}`}
                                    alt={skill.name}
                                    className="w-10 h-10 rounded-full"
                                />
                            </td>
                            <td className="p-4">{skill.name}</td>
                            <td className="p-4">{skill.percentage}%</td>
                            <td className="p-4">
                                <button onClick={() => deleteSkill(skill._id)} className="text-red-500 hover:text-red-700">
                                    <FaTrash className="text-xl" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    
        <div>
            <AdminSkillYear />
        </div>
    </div>
    
    );
}

export default AdminSkill;
