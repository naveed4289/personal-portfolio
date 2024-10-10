import React from 'react';

const AdminUserForm = ({ userDetails, handleInputChange, handleUserDetail }) => {
    return (
        <div className=" bg-[#18214A] p-6 rounded-[8px] shadow-lg flex-1 transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 text-center text-white">Your Detail</h3>
            <form onSubmit={handleUserDetail} className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userDetails.username}
                    onChange={handleInputChange}
                    className="p-3 w-full rounded-[5px] border border-[#D9D9D9] bg-transparent placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="p-3 w-full rounded-[5px] border border-[#D9D9D9] bg-transparent placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    className="p-3 w-full rounded-[5px] border border-[#D9D9D9] bg-transparent placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-[#080A35] text-white hover:bg-[#0a0c5a] p-3 rounded-md transition duration-200 ease-in-out"
                >
                    Update User Details
                </button>
            </form>
        </div>
    );
};

export default AdminUserForm;
