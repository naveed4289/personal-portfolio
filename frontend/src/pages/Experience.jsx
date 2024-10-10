import React, { useState, useEffect } from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

function Experience() {
  const [experiences, setExperiences] = useState([]); // State to hold the experiences
  const [visibleCount, setVisibleCount] = useState(4); // Initially show 4 experiences
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/getExperience'); // API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExperiences(data.response); // Set experiences based on API response
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchExperiences();
  }, []); // Run once when the component mounts

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 2); // Increase visible count by 2
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>; // Show loading state
  }

  return (
    <div className="bg-black text-white min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto mt-10">
        {/* Left Icon with Text */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-700 rounded-full p-4 md:p-8">
              <FaArrowUpRightFromSquare className="text-4xl md:text-5xl text-black" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Real <span className="text-purple-500">Problem</span> Solutions
              <br className="hidden md:block" /> Experience
            </h2>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.slice(0, visibleCount).map((experience) => (
            <div
              key={experience._id} // Use _id as the key
              className="bg-gray-800 p-4 md:p-6 rounded-lg flex items-center justify-between"
            >
              {/* Left Arrow Icon */}
              <div className={`rounded-full p-3 bg-purple-600`}>
                <FaArrowUpRightFromSquare className="text-white text-lg " />
              </div>

              {/* Right Side: Date, Title, and Company */}
              <div className="text-right ml-4">
                <p className="text-sm text-gray-400">{experience.date}</p>
                <h3 className="text-lg md:text-2xl font-semibold mt-1">{experience.title}</h3>
                <p className="text-gray-500">{experience.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {visibleCount < experiences.length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleShowMore}
              className="bg-purple-600 text-black py-2 px-4 rounded hover:bg-purple-700 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Experience;
