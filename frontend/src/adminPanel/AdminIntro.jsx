import React from 'react';

const AdminIntro = ({ userDetails, handleInputChange, handleUserDetail }) => {
    return (
        <form onSubmit={handleUserDetail}>
            <div className="h-[320px] rounded-[8px] bg-[#18214A] p-6 flex flex-col items-center justify-between shadow-lg transition-transform transform hover:scale-105"> {/* Adjusted height */}
                <h3 className="text-xl font-semibold mb-1 text-center text-white">Introduction</h3>
                <textarea
                    name="intro"
                    placeholder="Enter user intro"
                    value={userDetails.intro}
                    onChange={handleInputChange}
                    className="p-3 w-full h-28 rounded-[5px] bg-transparent placeholder-gray-400 text-white text-[16px] focus:outline-none focus:ring focus:ring-blue-500" // Adjusted textarea height if needed
                />
                <button
                    type="submit"
                    className="bg-[#080A35] text-white hover:bg-[#0a0c5a] p-3 rounded-md transition duration-200 ease-in-out w-full mt-4"
                >
                    Update User Intro
                </button>
            </div>
        </form>
    );
};

export default AdminIntro;
