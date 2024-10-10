import React, { useEffect, useState } from 'react';
import Home from './Home';
import About from './About';
import Services from './Services';
import Project from './Project';
import Contact from './Contact';

// Utility function for smooth scrolling
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

function Mains() {
  const [visibleSections, setVisibleSections] = useState({
    home: false,
    about: false,
    services: false,
    project: false,
    contact: false,
  });

  // Effect for handling initial scroll based on URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      scrollToSection(hash);
    }
  }, []);

  // Effect for observing sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
            observer.unobserve(entry.target); // Unobserve after it becomes visible
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    // Observing all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    // Cleanup on component unmount
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div>
      <section
        id="home"
        className={`${
          visibleSections.home ? 'fade-in' : 'opacity-0'
        } transition-opacity duration-2000`}
      >
        <Home />
      </section>
      <section
        id="about"
        className={`${
          visibleSections.about ? 'fade-in' : 'opacity-0'
        } transition-opacity duration-2000`}
      >
        <About />
      </section>
      <section
        id="project"
        className={`${
          visibleSections.project ? 'fade-in' : 'opacity-0'
        } transition-opacity duration-2000`}
      >
        <Project />
      </section>
      <section
        id="services"
        className={`${
          visibleSections.services ? 'fade-in' : 'opacity-0'
        } transition-opacity duration-2000`}
      >
        <Services />
      </section>
     
      <section
        id="contact"
        className={`${
          visibleSections.contact ? 'fade-in' : 'opacity-0'
        } transition-opacity duration-2000`}
      >
        <Contact />
      </section>
    </div>
  );
}

export default Mains;
