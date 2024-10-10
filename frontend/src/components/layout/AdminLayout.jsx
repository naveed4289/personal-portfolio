import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from "../../store/auth";
import { FiHome, FiUser, FiBriefcase, FiList, FiClock, FiLogOut, FiArrowRight, FiArrowLeft, FiMail, FiInfo } from "react-icons/fi"; 

function AdminLayout() {
  const { user, isLoading, LogoutUser } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Detect mobile screen size and auto-close the sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false); // Auto close sidebar on mobile screens
      } else {
        setSidebarOpen(true); // Open sidebar on larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger the check on component load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <h1 className="text-center text-white">Loading...</h1>;
  }

  if (!user?.isAdmin) {
    return <Navigate to='/' />;
  }

  const handleLogout = () => {
    LogoutUser();
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <FiHome /> },
    { to: `/admin/about`, label: "About", icon: <FiInfo /> },
    { to: "/admin/projects", label: "Projects", icon: <FiBriefcase /> },
    { to: "/admin/skill", label: "Skills", icon: <FiList /> },
    { to: "/admin/experience", label: "Timeline", icon: <FiClock /> },
    { to: `/admin/show/${user._id}/edit`, label: "Account", icon: <FiUser /> },
    { to: "/admin/messages", label: "Messages", icon: <FiMail /> },
  ];

  return (
    <div className="flex h-screen bg-[#050715]">
      {/* Sidebar */}
      <nav
        className={`bg-[#0b0e28] text-white p-4 transition-all duration-300
        ${isSidebarOpen ? "w-64" : "w-20"} h-auto shadow-lg`}
        style={{
          margin: isSidebarOpen ? '14px 5px 14px 14px' : '14px 5px 14px 0', // Default margins for desktop
        }}
      >
        {/* Toggle Button */}
        {isSidebarOpen && (
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleSidebar}
              className="text-white transition-transform transform hover:scale-110"
            >
              <FiArrowLeft className="text-2xl" />
            </button>
          </div>
        )}
        {!isSidebarOpen && (
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleSidebar}
              className="text-white transition-transform transform hover:scale-110"
            >
              <FiArrowRight className="text-2xl" />
            </button>
          </div>
        )}

        {/* Sidebar Links */}
        <ul className={`space-y-4 ${!isSidebarOpen && "flex flex-col items-center"}`}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className="flex items-center hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200"
              >
                <span className="text-2xl">{item.icon}</span>
                {isSidebarOpen && <span className="ml-3 text-lg">{item.label}</span>}
              </NavLink>
            </li>
          ))}
          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200"
            >
              <span className="text-2xl">
                <FiLogOut />
              </span>
              {isSidebarOpen && <span className="ml-3 text-lg">Logout</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content with Outlet */}
      <main
        className={`flex-grow transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
        style={{
          margin: "14px 14px 5px 14px",
          height: "calc(100vh - 32px)",
          borderRadius: "7px",
        }}
      >
        <div className="bg-[#0b0e28] p-4 rounded-lg shadow-lg h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
