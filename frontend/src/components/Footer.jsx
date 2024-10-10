import React from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';


function Footer() {
  return (
    <div className="footer">
      <div className="footer-section name">
        <p>© 2024 Athisham Arshad. All Rights Reserved.</p>
      </div>
      <div className="footer-section logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="footer-section icons">
        <a href="https://github.com/AhtishamArshadGitHub" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/ahtisham-arshad-87674a275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://wa.me/03167946688" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
        <a href="mailto:ahtishamarshad888@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
}

export default Footer;
