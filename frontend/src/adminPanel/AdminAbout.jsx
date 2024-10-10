// AdminAbout.jsx
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminUserForm from './AdminUserForm';
import AdminIntro from './AdminIntro';
import AdminOverview from './AdminOverview';
import AdminRoles from './AdminRoles';
import AdminImage from './AdminImage';
import AdminResume from './AdminResume';

function AdminAbout() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        phone: '',
        intro: '',
        overview: '',
        _id: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const userDatas = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/get/userData', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.response && data.response.length > 0) {
                    const userData = data.response[0];
                    setUserDetails({
                        username: userData.username,
                        email: userData.email,
                        phone: userData.phone,
                        intro: userData.intro || '',
                        overview: userData.overview || '',
                        _id: userData._id,
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleUserDetail = async (e) => {
        e.preventDefault();
        if (isUpdating) return;  // Prevent multiple submissions
        setIsUpdating(true);
        try {
            const response = await fetch(`http://localhost:3000/api/admin/update/userData/${userDetails._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });

            if (response.ok) {
                toast.success("User updated successfully!", { autoClose: 1000 });
                await userDatas();
            } else {
                toast.error("Failed to update user. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsUpdating(false);  // Reset the updating state
        }
    };

    useEffect(() => {
        userDatas();
    }, []);

    return (
        <div className="about-us h-[90vh] overflow-y-auto p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-left text-white">About Us</h1>
            <p className="text-xs md:text-sm text-gray-300 mb-4">Change Your Details</p>

            {/* First Flexbox Section */}
            <div className="about-us__content flex flex-col md:flex-row gap-2 md:gap-4 mb-3">
                <div className="about-us__image-container w-full md:w-1/4">
                    <AdminImage />
                </div>
                <div className="about-us__intro-container w-full md:w-3/4">
                    <AdminIntro
                        userDetails={userDetails}
                        handleInputChange={handleInputChange}
                        handleUserDetail={handleUserDetail}
                    />
                </div>
            </div>

            {/* Second Flexbox Section */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4">
                <div className="flex-1 bg-[#18214A] p-4 md:p-6 rounded-[8px] shadow-lg min-h-[250px] md:min-h-[300px]">
                    <AdminUserForm
                        userDetails={userDetails}
                        handleInputChange={handleInputChange}
                        handleUserDetail={handleUserDetail}
                    />
                </div>
                <div className="flex-1 bg-[#18214A] p-4 md:p-6 rounded-[8px] shadow-lg min-h-[250px] md:min-h-[300px]">
                    <AdminRoles />
                </div>
            </div>

            {/* Third Flexbox Section */}
            <div className="about-us__content flex flex-col md:flex-row gap-2 md:gap-4 mb-3">
                <div className="about-us__intro-container w-full md:w-3/4 flex-grow">
                    <AdminOverview
                        userDetails={userDetails}
                        handleInputChange={handleInputChange}
                        handleUserDetail={handleUserDetail}
                    />
                </div>
                <div className="about-us__image-container w-full md:w-1/4 flex-grow">
                    <AdminResume />
                </div>
            </div>

            <ToastContainer />
        </div>





    );
}

export default AdminAbout;
