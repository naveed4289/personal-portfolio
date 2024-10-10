import React, { useEffect, useRef } from 'react';

const AnalogClock = () => {
  const minuteHandRef = useRef(null);
  const hourHandRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const minuteDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6); // Adding seconds for smooth minute hand
      const hourDeg = ((hours % 12) / 12) * 360 + ((minutes / 60) * 30); // Adding minutes for smooth hour hand

      if (minuteHandRef.current) minuteHandRef.current.style.transform = `rotate(${minuteDeg}deg)`;
      if (hourHandRef.current) hourHandRef.current.style.transform = `rotate(${hourDeg}deg)`;
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock(); // Initial call to set the hands to the current time immediately

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-48 h-48 border-8 border-gray-700 rounded-full flex justify-center items-center bg-gray-900 shadow-lg">
      {/* Clock Circle */}
      <div className="absolute w-full h-full rounded-full border-4 border-gray-500"></div>

      {/* Clock Hands */}
      <div
        className="hand hour w-3 h-20 bg-red-500 absolute bottom-1/2 transform origin-bottom rounded-md transition-transform duration-500 ease-in-out"
        ref={hourHandRef}
      />
      <div
        className="hand minute w-2 h-30 bg-red-500 absolute bottom-1/2 transform origin-bottom rounded-md transition-transform duration-500 ease-in-out"
        ref={minuteHandRef}
      />

      {/* Center Dot */}
      <div className="w-4 h-4 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" />

      {/* No Display of Current Time */}
      {/* Removed the time display in the center */}
    </div>
  );
};

export default AnalogClock;
