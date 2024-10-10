// UserOverview.jsx
import React from 'react';

const AdminOverview = ({ userDetails, handleInputChange, handleUserDetail }) => {
    return (
        <form onSubmit={handleUserDetail}>
        <div className="h-full rounded-[8px] bg-[#18214A] p-6 flex flex-col items-center justify-around shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 text-center text-white">Overview</h3>
            <textarea
                name="overview"
                placeholder="Enter user overview"
                value={userDetails.overview}
                onChange={handleInputChange}
                className="p-3 w-full h-48 rounded-[5px] bg-transparent placeholder-gray-400 text-white text-[17px] focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-[#080A35] text-white hover:bg-[#0a0c5a] p-3 rounded-md transition duration-200 ease-in-out w-full mt-4"
            >
                Update User Overview
            </button>
        </div>
    </form>
    
    );
};

export default AdminOverview;
