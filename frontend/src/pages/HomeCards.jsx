import React from 'react';
import { FaCogs, FaHandsHelping, FaReact } from 'react-icons/fa'; // Import icons from react-icons

function HomeCards() {
  const cardsData = [
    {
      id: 1,
      title: "Smart Collection",
      description: "Delivering unmatched value and expertise.",
      icon: <FaCogs size={40} className="text-white" />, // Smart Collection Icon
    },
    {
      id: 2,
      title: "Collaboration",
      description: "Crafting digital solutions with passion and precision.",
      icon: <FaHandsHelping size={40} className="text-white" />, // Collaboration Icon
    },
    {
      id: 3,
      title: "Technology",
      description: "Leveraging modern technology for optimal results.",
      icon: <FaReact size={40} className="text-white" />, // Technology Icon
    },
  ];

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl px-4">
        {/* First Card - Static */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg p-4 shadow-lg w-full h-[250px] flex flex-col items-start justify-center transition-transform duration-300 hover:scale-105 md:w-[calc(33.33%-12px)]">
          <h2 className="text-sm font-bold bg-white pt-1 pb-1 pl-2 pr-2 rounded-2xl mb-2">Why Choose Me</h2>
          <h3 className="text-left text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 mb-2">
            Delivering Unmatched Value and Expertise
          </h3>
          <p className="text-gray-200 text-left">Crafting digital solutions with passion and precision.</p>
        </div>

        {/* Cards from Map */}
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="bg-gradient-to-b from-gray-800 to-black rounded-lg p-4 shadow-lg text-left w-full h-[250px] flex flex-col items-start justify-center transition-transform duration-300 hover:scale-105 sm:w-[calc(100%-12px)] md:w-[calc(33.33%-12px)]"
          >
            <div className="bg-gray-700 rounded-xl p-2 flex items-center justify-center mb-4">
              {card.icon}
            </div>
            <h3 className="text-white text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-white">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeCards;
