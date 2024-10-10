import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { storeTokenInLocalStorage } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        storeTokenInLocalStorage(data.token);
        setUser({ email: "", password: "" });
        toast.dark("Login successfully", { autoClose: 2000 });
        navigate("/admin");
      } else {
        const errorMessage = data.extraDetails
          ? data.extraDetails.join(', ')
          : data.message;
        toast.error(errorMessage, { autoClose: 3000 });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="login-card max-w-md w-full p-6 bg-white rounded shadow-md"> {/* Adjust padding and max width */}
        <h1 className="text-2xl text-white font-bold text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              onChange={handleInput}
              value={user.email}
              id="email"
              name="email"
              placeholder="Enter your email"
              className="input-field w-full p-2 border border-gray-300 rounded" // Adjust classes
              required
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              onChange={handleInput}
              value={user.password}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="input-field w-full p-2 border border-gray-300 rounded" // Adjust classes
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500 text-lg" />
              ) : (
                <FaEye className="text-gray-500 text-lg" />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <NavLink
              to="/forgot-password"
              className="text-blue-400 hover:text-blue-600 font-semibold transition duration-200 ease-in-out"
            >
              Forgot Password?
            </NavLink>
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="login-button w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
