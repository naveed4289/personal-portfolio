import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";

function AdminAccount() {
    const { authorizationToken } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '' // Add password field
    });

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/show/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Get error details
                throw new Error(errorData.message || 'Failed to fetch user data'); // Use error message from server
            }
    
            const data = await response.json();
            if (data && data.data) {
                setUserData({
                    username: data.data.username,
                    email: data.data.email,
                    phone: data.data.phone,
                    password: '', // Reset password field
                });
            } else {
                toast.error("User data not found");
            }
        } catch (error) {
            console.error("Error fetching user data:", error); // More descriptive log
            toast.error(error.message || "Failed to fetch user data"); // Display the error message
        }
    };
    
    
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/auth/show/update/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.token) {
                    localStorage.setItem('token', result.token); 
                }
                navigate('/');
                toast.success("Update successfully");
            } else {
                const error = await response.json();
                toast.error(`Update failed: ${error.message}`);
            }
        } catch (error) {
            console.error("Update request error:", error);
            toast.error("Update request error");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="UpdateAccountForm">
            {/* <h1 className='text-white font-bold text-5xl mb-20'>Change Your Account</h1> */}
        <form 
            onSubmit={handleSubmit} 
            className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-600 shadow-lg w-full max-w-md"
        >
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">Edit User</h2>
            
            <div className="form-group mb-4">
                <label htmlFor="username" className="block text-white mb-2">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                    placeholder="Enter your username"
                    required
                />
            </div>
            
            <div className="form-group mb-4">
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                    placeholder="Enter your email"
                    required
                />
            </div>
            
            <div className="form-group mb-6">
                <label htmlFor="phone" className="block text-white mb-2">Phone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                    placeholder="Enter your phone number"
                    required
                />
            </div>
            
            <div className="form-group mb-6">
                <label htmlFor="password" className="block text-white mb-2">New Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                    placeholder="Update Your Password"
                />
            </div>
            
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Update
            </button>
        </form>
    </div>
    
    
    );
}

export default AdminAccount;
