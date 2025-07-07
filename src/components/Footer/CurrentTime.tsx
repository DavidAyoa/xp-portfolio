import React, { useState, useEffect } from 'react';

interface CurrentTimeProps {
  locale?: 'en' | 'fr';
  className?: string;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ locale = 'en', className = '' }) => {
  const [formattedTime, setFormattedTime] = useState('');

  const getCurrentTime = () => {
    const now = new Date();
    if (locale === 'fr') {
      return getFrenchTime(now);
    } else {
      return getEnglishTime(now);
    }
  };

  const getFrenchTime = (now: Date) => {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const getEnglishTime = (now: Date) => {
    const hours = now.getHours() % 12 || 12; // Convert 0 to 12 for 12-hour format
    const minutes = now.getMinutes();
    const amPm = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
  };

  const updateTime = () => {
    setFormattedTime(getCurrentTime());
  };

  useEffect(() => {
    // Update the time immediately
    updateTime();
    // Update the time every 2 seconds
    const interval = setInterval(updateTime, 2000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [locale]); // Re-run effect when locale changes

  return (
    <div className={`text-white text-xs px-2 ${className}`}>
      {formattedTime}
    </div>
  );
};

export default CurrentTime;
