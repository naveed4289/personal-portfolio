import React, { useState, useEffect } from 'react';

// InputField component to reduce code repetition
const InputField = ({ label, type, value, onChange, min, max }) => (
    <div>
        <label className="block text-sm font-medium text-white">{label}:</label>
        <input
            type={type}
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            required
            className="mt-1 block w-full border border-gray-600 bg-transparent text-white rounded-md shadow-sm p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
    </div>
);

const AdminSkillYear = () => {
    const [formData, setFormData] = useState({
        yearOfExperience: '',
        completedProjects: '',
        clientSatisfaction: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [skillYears, setSkillYears] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const fetchSkillYears = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/getSkillYear');
            if (!response.ok) {
                throw new Error('Error fetching skill years');
            }
            const data = await response.json();
            setSkillYears(data.response);
            if (data.response.length > 0) {
                setSelectedSkill(data.response[0]);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchSkillYears();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const { yearOfExperience, completedProjects, clientSatisfaction } = formData;

            if (yearOfExperience < 0 || completedProjects < 0 || clientSatisfaction < 0) {
                throw new Error('Fields must be non-negative numbers');
            }

            const response = await fetch(`http://localhost:3000/api/admin/updateSkillYear/${selectedSkill._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error updating skill year');
            }

            const data = await response.json();
            setSuccessMessage(data.message);
            setFormData({ yearOfExperience: '', completedProjects: '', clientSatisfaction: '' });
            fetchSkillYears();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedSkill) {
            setFormData({
                yearOfExperience: selectedSkill.yearsOfExperience,
                completedProjects: selectedSkill.completedProjects,
                clientSatisfaction: selectedSkill.clientSatisfaction,
            });
        }
    }, [selectedSkill]);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">Update Skill Year</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                    label="Years of Experience"
                    type="number"
                    name="yearOfExperience"
                    value={formData.yearOfExperience}
                    onChange={handleChange}
                    min="0"
                />
                <InputField
                    label="Completed Projects"
                    type="number"
                    name="completedProjects"
                    value={formData.completedProjects}
                    onChange={handleChange}
                    min="0"
                />
                <InputField
                    label="Client Satisfaction (%)"
                    type="number"
                    name="clientSatisfaction"
                    value={formData.clientSatisfaction}
                    onChange={handleChange}
                    min="0"
                    max="100"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white font-semibold py-3 rounded-md transition duration-200 ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500'}`}
                >
                    {loading ? 'Updating...' : 'Update Skill Year'}
                </button>
            </form>
            {error && <p className="mt-4 text-red-400">{error}</p>}
            {successMessage && <p className="mt-4 text-green-400">{successMessage}</p>}
        </div>

    );
};

export default AdminSkillYear;
