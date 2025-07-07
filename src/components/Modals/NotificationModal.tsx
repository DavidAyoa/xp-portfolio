import React, { useEffect, useState } from 'react';

interface NotificationModalProps {
  onClose: () => void;
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  onClose,
  isFullScreen,
  onToggleFullScreen
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 1000); // Wait for animation to complete
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed right-12 md:right-16 bottom-11 
        border border-black bg-light-yellow rounded-lg 
        text-xs whitespace-nowrap py-1.5 pr-9 pb-2.5 pl-2.5 
        text-black shadow-lg transform transition-all duration-1000
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <button 
        onClick={handleClose} 
        className="
          absolute right-1 top-1 w-4 h-4 
          before:content-[''] before:absolute before:top-1/2 before:left-1/2 
          before:w-3 before:h-px before:bg-black before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45
          after:content-[''] after:absolute after:top-1/2 after:left-1/2 
          after:w-3 after:h-px after:bg-black after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45
          hover:bg-gray-300 rounded-sm
        "
        aria-label="Close notification"
      />
      <div className="flex items-center mb-1">
        <img 
          className="w-3.5 h-3.5 mr-1" 
          src="/img/icons/info-icon.webp" 
          alt="Information" 
        />
        <span className="font-medium">
          {isFullScreen ? 'Exit Full Screen Mode' : 'Full Screen Available'}
        </span>
      </div>
      <p className="text-xs mb-1">
        {isFullScreen 
          ? 'Click the button in the bottom right to exit full screen mode.'
          : 'For a better experience, try full screen mode by clicking the button in the bottom right.'
        }
      </p>
      <button 
        onClick={onToggleFullScreen}
        className="text-blue-600 hover:underline text-xs"
      >
        {isFullScreen ? 'Exit Full Screen' : 'Go Full Screen'}
      </button>
    </div>
  );
};

export default NotificationModal;
