import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon

function AdminRoles() {
    const [role, setRole] = useState();
    const [roles, setRoles] = useState([]);

    const handleInputRole = (e) => {
        setRole(e.target.value);
    };

    const handleRole = async (e) => {
        e.preventDefault();

        if (!role.trim()) {
            toast.error("Role cannot be empty", { autoClose: 2000 });
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/admin/addRole", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role }), // Send role as a string in an object
            });

            if (response.ok) {
                setRole(""); // Reset role input after successful submission
                toast.success("Role sent successfully!", { autoClose: 2000 });
            } else {
                const errorResponse = await response.json(); // Get the error message if any
                toast.error(
                    `Failed to send role: ${errorResponse.message || "Please try again."}`,
                    { autoClose: 2000 }
                );
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error("An error occurred. Please try again.", { autoClose: 2000 });
        }
    };

    const deleteRole = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/role/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.ok) {
                userRole(); // Fetch updated roles after deletion
                toast.success("Role deleted successfully!", { autoClose: 2000 });
            } else {
                toast.error("Failed to delete role.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    const userRole = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/admin/getRole", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRoles(data.response || []);
            } else {
                toast.error("Failed to fetch roles.");
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    useEffect(() => {
        userRole();
    }, [handleRole]);

    return (
        <div className=" bg-[#18214A] p-6 rounded-[8px] shadow-lg flex-1 transition-transform transform hover:scale-105">
        <h3 className="text-xl font-semibold mb-4 text-center text-white">Add Role</h3>
        <form onSubmit={handleRole} className="flex items-center space-x-2">
            <input
                type="text"
                name="role"
                placeholder="Role"
                autoComplete="off"
                value={role}
                onChange={handleInputRole}
                required
                className="p-3 rounded-[4px] border border-[#D9D9D9] bg-transparent placeholder-gray-400 text-white text-[14px] flex-1 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-[#080A35] p-2 rounded-full flex items-center justify-center"
            >
                <FaPlus className="text-white" />
            </button>
        </form>
    
        <h3 className="text-xl font-semibold mb-4 text-center text-white mt-4">Existing Roles</h3>
        <div className="flex flex-wrap gap-2">
            {roles.map((role, index) => (
                <div
                    key={index}
                    className="bg-[#080A35] text-white px-2 py-1 rounded-full flex items-center space-x-2 group relative text-xs hover:bg-blue-700 transition-colors" // Changed text size to xs
                >
                    <span className='text-xs'>{role.role}</span> {/* Set text size to xs */}
                    <button
                        className="text-red-400 hover:text-red-600 ml-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteRole(role._id)}
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
        <ToastContainer />
    </div>
    
    );
}

export default AdminRoles;
