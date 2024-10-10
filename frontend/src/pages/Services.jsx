import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

function Services() {
  const services = [
    {
      title: 'Basic Plan',
      price: '$19.95',
      discount: 'Save 20%',
      features: ['Website Design', 'Mobile Apps Design', 'Product Design'],
      description: 'Try Out Basic Plan',
      disabledFeatures: ['Digital Marketing', 'Custom Support'],
    },
    {
      title: 'Standard Plan',
      price: '$39.95',
      discount: 'Save 35%',
      features: [
        'Website Design',
        'Mobile Apps Design',
        'Product Design',
        'Digital Marketing',
        'Custom Support',
      ],
      description: 'Try Out Standard Plan',
    },
    {
      title: 'Premium Plan',
      price: '$99.95',
      discount: 'Save 45%',
      features: [
        'Website Design',
        'Mobile Apps Design',
        'Product Design',
        'Digital Marketing',
        'Custom Support',
      ],
      description: 'Try Out Premium Plan',
    },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col items-center py-10 mt-16 mb-10"> {/* Changed mt-50 to mt-16 */}
      <h2 className="text-4xl font-bold mb-8 text-center">
        Amazing <span className="text-purple-400">Pricing</span> For your Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4 md:px-0 mt-10 mb-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center relative"
          >
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{service.description}</p>
            <p className="text-3xl font-bold text-purple-400 mb-2">
              {service.price}
              <span className="text-lg font-normal">/per month</span>
            </p>
            <p className="text-sm text-purple-400 mb-6">{service.discount}</p>
            <ul className="mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center justify-center mb-2">
                  <FaCheckCircle className="text-purple-400 mr-2" />
                  {feature}
                </li>
              ))}
              {service.disabledFeatures &&
                service.disabledFeatures.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-center mb-2 text-gray-500 line-through"
                  >
                    {feature}
                  </li>
                ))}
            </ul>
            <button className="bg-purple-400 text-white py-2 px-6 rounded-full hover:bg-purple-500 transition duration-300"> {/* Updated hover color for better visibility */}
              Choose Package
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
