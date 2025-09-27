import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface NotificationModalProps {
  onToggleFullscreen: () => void;
  showOnLogin?: boolean;
  triggerShow?: boolean;
  onClose?: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  onToggleFullscreen,
  showOnLogin = false,
  triggerShow = false,
  onClose
}) => {
  const { t } = useTranslation();

  // Auto-hide after 6 seconds when triggered
  useEffect(() => {
    if (triggerShow) {
      const hideTimer = setTimeout(() => {
        if (onClose) onClose();
      }, 6000);

      return () => clearTimeout(hideTimer);
    }
  }, [triggerShow, onClose]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) onClose();
  };

  const handleFullscreenToggle = () => {
    onToggleFullscreen();
    if (onClose) onClose();
  };

  if (!triggerShow) return null;

  return (
    <div
      className="fixed font-tahoma text-xs z-50 animate-fade-in cursor-pointer hover:bg-yellow-100"
      style={{
        right: '35px',
        bottom: '40px', // Above the taskbar
        backgroundColor: '#ffffe1',
        border: '1px solid black',
        borderRadius: '7px',
        padding: '6px 28px 10px 10px', // Authentic padding
        filter: 'drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.4))',
        fontSize: '11px',
        width: '270px' // Fixed width to allow wrapping
      }}
      onClick={handleFullscreenToggle}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute right-1 top-1 w-3.5 h-3.5 bg-transparent outline-none border-none"
        style={{
          fontSize: '0px' // Hide any text
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">×</span>
      </button>

      {/* Balloon Content */}
      <div className="flex items-start">
        <img src="/img/icons/info-icon.webp" alt="Info" className="w-3.5 h-3.5 mr-2 mt-0.5" />
        <div>
          <div className="font-bold text-black leading-tight mb-1">
            {t('notification.title', 'Fullscreen Available')}
          </div>
          <div className="text-black leading-tight mb-2">
            {t('notification.fullscreenMessage', 'Click here for best experience')}
          </div>
        </div>
      </div>

      {/* Balloon Tail - styled like authentic version */}
      <div
        className="absolute"
        style={{
          bottom: '-19px',
          right: '32px',
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 19px 19px 0',
          borderColor: 'transparent black transparent transparent'
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '-17px',
          right: '33px',
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 18px 18px 0',
          borderColor: 'transparent #ffffe1 transparent transparent'
        }}
      />
    </div>
  );
};

export default NotificationModal;