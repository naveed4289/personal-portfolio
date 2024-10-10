import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

function AdminImage() {
    const [products, setProducts] = useState([]); // Store image data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state
    const [selectedProduct, setSelectedProduct] = useState(null); // Product to update
    const [newImage, setNewImage] = useState(null); // New image file

    // Fetch image data from the API
    const getImageData = async () => {
        setLoading(true);
        setError(''); // Clear previous error
        try {
            const response = await fetch('http://localhost:3000/api/admin/image/data');

            if (!response.ok) throw new Error('Failed to fetch images');

            const data = await response.json();
            setProducts(data.response); // Set the image data
        } catch (err) {
            setError('Could not load images, please try again.');
            toast.error(err.message); // Show error message
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    // Update the selected image
    const updateImage = async (id) => {
        if (!newImage) {
            toast.error('Please select an image to upload!');
            return;
        }

        const formData = new FormData();
        formData.append('image', newImage); // Attach image file

        try {
            const response = await fetch(`http://localhost:3000/api/admin/image/update/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to update image');

            toast.success('Image updated successfully');
            setNewImage(null); // Clear image input
            setSelectedProduct(null); // Reset selected product
            getImageData(); // Refresh the image list
        } catch (err) {
            toast.error(err.message);
        }
    };

    // Run getImageData on component mount
    useEffect(() => {
        getImageData();
    }, []);

    // Display loading state
    if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;

    // Display error if it exists
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div>
            <div className="m-0 h-[320px] rounded-[8px] bg-[#18214A] p-4 flex flex-col items-center justify-around overflow-y-auto">
                {products.map((product, index) => {
                    const imageUrl = `http://localhost:3000/${product.image.replace(/\\/g, '/')}`;

                    return (
                        <div
                            key={index}
                            className="text-center flex flex-col items-center justify-center space-y-4 w-full"
                        >
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-{90%} h-auto max-h-[60%] object-cover rounded-[5px] mb-2"
                            />
                            {selectedProduct === product ? (
                                <>
                                    <input
                                        type="file"
                                        onChange={(e) => setNewImage(e.target.files[0])}
                                        className="border border-gray-300 rounded w-full p-2 mb-4 text-white"
                                    />
                                    <div className="flex space-x-2"> {/* Flex container for icons */}
                                        <button
                                            type="button" // Ensure type is button
                                            onClick={() => updateImage(product._id)}
                                            className="bg-[#080A35] text-white rounded p-2"
                                            title="Update Image"
                                        >
                                            <FaCheck />
                                        </button>
                                        <button
                                            type="button" // Ensure type is button
                                            onClick={() => {
                                                setSelectedProduct(null);
                                                setNewImage(null); // Clear image input
                                            }}
                                            className="bg-[#080A35] text-white rounded p-2"
                                            title="Cancel"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <button
                                    type="button" // Ensure type is button
                                    className="bg-[#080A35] text-white py-2 px-6 rounded-md hover:bg-[#0a0c5a] transition"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    Update Image
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminImage;
