import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('Error sending reset link. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900"> {/* Darker background */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"> {/* Darker card background */}
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Forgot Password</h2> {/* White text for the title */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">Email:</label> {/* Lighter gray for label */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" // Adjusted colors for input
              placeholder="Enter your email"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>} {/* Red message color */}
      </div>
    </div>
  );
};

export default ForgotPassword;
