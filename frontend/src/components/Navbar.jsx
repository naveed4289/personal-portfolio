import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth"; // Adjust the path as necessary

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, '', `#${sectionId}`); // Update URL hash
  }
};

const Navbar = () => {
  const location = useLocation();
  const { user, LogoutUser } = useAuth();
  const isAdmin = user?.isAdmin; // Use optional chaining
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'project', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (item) => {
    const scrollFunc = () => scrollToSection(item.id);
    location.pathname === '/' ? scrollFunc() : (window.location.href = `/#${item.id}`);
    setMenuOpen(false);
  };

  const handleConnectClick = (e) => {
    e.preventDefault();
    const scrollFunc = () => scrollToSection('contact');
    location.pathname === '/' ? scrollFunc() : (window.location.href = '/#contact');
    setMenuOpen(false);
  };



  if (isAdmin) return null; // Hide navbar if user is admin

  return (
    <nav className="navbar">
      <div className="logo-section">
        <NavLink to="/" className="logo" onClick={() => scrollToSection('home')}>
          <img src="logo.png" alt="Logo" />
          <span className="brand-name">Athisham Arshad</span>
        </NavLink>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? 'active' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'active' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'active' : ''}`}></div>
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navItems.map(({ id, label }) => (
          <li key={id}>
            <button className="nav-item" onClick={() => handleNavClick({ id, label })}>
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className="auth-buttons">
        <a href="#contact" className="auth-button" onClick={handleConnectClick}>
          Connect
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
