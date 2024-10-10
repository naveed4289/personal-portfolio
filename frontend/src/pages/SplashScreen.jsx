// components/SplashScreen.jsx
import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000); // Show for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null; // Don't render if show is false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex flex-col items-center opacity-0 animate-fade-in">
        <div className="w-20 h-20 mb-4 bg-blue-500 rounded-full flex items-center justify-center animate-spin">
          <span className="text-white text-2xl font-bold">✨</span>
        </div>
        <h1 className="text-white text-3xl font-semibold animate-slide-in">
          Welcome to PortFolio
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
