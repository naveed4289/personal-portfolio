import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import Download from './Download';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner

function Home() {
  const { user, loading } = useAuth();
  const [contactInfo, setContactInfo] = useState({
    username: "",
    email: "",
    intro: "",
  });

  const [roles, setRoles] = useState([]);
  const [currentRole, setCurrentRole] = useState('');
 
  // Fetch roles from the API
  const fetchRoles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/getRole', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.response && Array.isArray(data.response)) {
          const roleStrings = data.response.map(roleObj => roleObj.role);
          setRoles(roleStrings);
          if (roleStrings.length > 0) {
            setCurrentRole(roleStrings[0]);
          }
        } else {
          console.error("No roles found in response");
        }
      } else {
        console.error('Failed to fetch roles:', response.status);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (roles.length > 0) {
        index = (index + 1) % roles.length;
        setCurrentRole(roles[index]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [roles]);

  // Fetch user data
  const userDatas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/get/userData', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.response && data.response.length > 0) {
          const userData = data.response[0];
          setContactInfo({
            username: userData.username,
            intro: userData.intro,
          });
        } 
      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  useEffect(() => {
    userDatas();
  }, []);
 
  if (loading) {
    return <LoadingSpinner />; // Show loading spinner if loading
  }

  return (
    <div className="home-container">
      <h1 className="main-title">Hi, I'm <span className="highlight">{contactInfo.username || "Loading..."}</span></h1>
      <h2 className="role-title">{currentRole || "Loading..."}</h2>
      <p className="welcome-text">
        {contactInfo.intro || "Loading..."}
      </p>
      <Download/>

      <div className="scroll-indicator w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default Home;
