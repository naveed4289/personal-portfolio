import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Importing icons for delete and edit buttons

const AdminExperience = () => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [editId, setEditId] = useState(null); // ID of the experience to edit

  // Function to fetch experiences
  const fetchExperiences = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/getExperience');
      const data = await response.json();

      if (response.ok) {
        if (Array.isArray(data.response)) {
          setExperiences(data.response);
        } else {
          toast.error('Unexpected data format');
        }
      } else {
        toast.error(data.message || 'Failed to fetch experiences');
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    }
  };

  // Fetch experiences on component mount
  useEffect(() => {
    fetchExperiences();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const experienceData = {
      date,
      title,
      company,
    };
  
    try {
      let response;
      if (editMode) {
        // Update existing experience
        response = await fetch(`http://localhost:3000/api/admin/updateExperience/${editId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(experienceData),
        });
      } else {
        // Add new experience
        response = await fetch('http://localhost:3000/api/admin/addExperience', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(experienceData),
        });
      }
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.message, { autoClose: 2000 });
  
        // Prepend the new experience to the existing list
        if (editMode) {
          // Update the existing experience in the state
          setExperiences((prev) => prev.map((exp) => (exp._id === editId ? { ...exp, ...experienceData } : exp)));
        } else {
          // Add the new experience to the top of the list
          setExperiences((prev) => [experienceData, ...prev]);
        }
  
        // Clear the form
        setDate('');
        setTitle('');
        setCompany('');
        setEditMode(false);
        setEditId(null);
      } else {
        toast.error(data.message || 'Failed to process request');
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    }
  };
  

  // Handle delete experience
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/deleteExperience/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, { autoClose: 2000 });
        fetchExperiences(); // Refresh the experiences list
      } else {
        toast.error(data.message || 'Failed to delete experience');
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    }
  };

  // Handle edit experience
  const handleEdit = (experience) => {
    setDate(experience.date);
    setTitle(experience.title);
    setCompany(experience.company);
    setEditId(experience._id); // Set ID for the experience being edited
    setEditMode(true); // Set edit mode
  };

  return (
    <div className='flex h-[90vh] bg-gray-900'>
      {/* Form Section */}
      <div className="w-1/4 p-4  rounded-lg shadow-md">
        <h2 className="text-2xl text-white mb-4">{editMode ? 'Edit Experience' : 'Add Experience'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              placeholder="e.g. 2021 - Present"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Mern Stack Developer"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              placeholder="e.g. Devsinc"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#9124b5] text-white p-2 rounded hover:bg-[#7c1e8c] transition duration-300"
          >
            {editMode ? 'Update Experience' : 'Add Experience'}
          </button>
        </form>
      </div>

      {/* Experience List Section */}
      <div className="w-3/4 p-4">
        
        <div >
  <h2 className="text-2xl text-white mb-4">Experience List</h2>
  <div className="overflow-y-auto max-h-97 bg-gray-800 rounded-lg shadow-md">
    <table className="min-w-full bg-gray-900 text-white border border-gray-700">
      <thead>
        <tr className="bg-gray-700">
          <th className="py-2 px-4 border-b border-gray-600">Date</th>
          <th className="py-2 px-4 border-b border-gray-600">Title</th>
          <th className="py-2 px-4 border-b border-gray-600">Company</th>
          <th className="py-2 px-4 border-b border-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {experiences.length > 0 ? (
          experiences.map((experience) => (
            <tr key={experience._id} className="hover:bg-gray-700 transition duration-300">
              <td className="py-2 px-4 border-b border-gray-600">{experience.date}</td>
              <td className="py-2 px-4 border-b border-gray-600">{experience.title}</td>
              <td className="py-2 px-4 border-b border-gray-600">{experience.company}</td>
              <td className="py-2 px-4 border-b border-gray-600 flex items-center">
                <button
                  onClick={() => handleEdit(experience)} // Pass the experience to handleEdit
                  className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition duration-300 flex items-center mr-2"
                >
                  <FaEdit className="mr-1" /> 
                </button>
                <button
                  onClick={() => handleDelete(experience._id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition duration-300 flex items-center"
                >
                  <FaTrashAlt className="mr-1" /> 
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="py-2 px-4 text-center">No experiences found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
</div>
      <ToastContainer />
    </div>
  );
};

export default AdminExperience;
