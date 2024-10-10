import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { FaTrash } from 'react-icons/fa'; // Import the delete icon

function AdminContacts() {
    const { authorizationToken } = useAuth();
    const [users, setUsers] = useState([]);

    const getAllUsersData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/form/get/contacts', {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }; 

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/form/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Delete failed:", errorData);
            } else {
                const data = await response.json();
                console.log(data);
                getAllUsersData();
            }
        } catch (error) {
            console.error("Delete request error:", error);
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <div className="admin-users p-6 bg-[#0b0e28] text-white h-3/4 overflow-y-auto">
    <h2 className="text-3xl font-bold mb-6 text-center">Users Messages</h2>
    <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-700 bg-transparent text-white">
            <thead className="border-b border-gray-700">
                <tr className="bg-[#1c204b]">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Message</th>
                    <th className="px-4 py-2 text-center">Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map((curElem, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-[#2a305c]">
                        <td className="px-4 py-2">{curElem.username}</td>
                        <td className="px-4 py-2">{curElem.email}</td>
                        <td className="px-4 py-2">{curElem.message}</td>
                        <td className="px-4 py-2 text-center">
                            <button
                                onClick={() => deleteUser(curElem._id)}
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded flex justify-center items-center mx-auto"
                                style={{ width: '40px', height: '40px' }} // Adjust button size if necessary
                            >
                                <FaTrash className="w-4 h-4" /> {/* Adjust icon size */}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
}

export default AdminContacts;
