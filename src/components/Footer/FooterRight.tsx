import React, { useState, useEffect, useRef } from "react";
import MusicVolumeModal from "../Modals/MusicVolumeModal";
import LanguageModal from "../Modals/LanguageModal";
import NotificationModal from "../Modals/NotificationModal";

const FooterRight: React.FC = () => {
  const [volume, setVolume] = useState(0.5);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVolumeSettingsDisplayed, setIsVolumeSettingsDisplayed] =
    useState(false);
  const [isLanguageSettingsDisplayed, setIsLanguageSettingsDisplayed] =
    useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(
    localStorage.getItem("currentLocale") || "en"
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  const musicModalRef = useRef<HTMLDivElement>(null);
  const languageModalRef = useRef<HTMLDivElement>(null);

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Handle click outside to close modals
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        musicModalRef.current &&
        !musicModalRef.current.contains(event.target as Node)
      ) {
        setIsVolumeSettingsDisplayed(false);
      }
      if (
        languageModalRef.current &&
        !languageModalRef.current.contains(event.target as Node)
      ) {
        setIsLanguageSettingsDisplayed(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
      const hideTimer = setTimeout(() => {
        setShowNotification(false);
      }, 6000);
      return () => clearTimeout(hideTimer);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleVolumeModal = () => {
    setIsVolumeSettingsDisplayed(!isVolumeSettingsDisplayed);
    if (isLanguageSettingsDisplayed) setIsLanguageSettingsDisplayed(false);
  };

  const toggleLanguageModal = () => {
    setIsLanguageSettingsDisplayed(!isLanguageSettingsDisplayed);
    if (isVolumeSettingsDisplayed) setIsVolumeSettingsDisplayed(false);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    // TODO: Update global volume state if needed
  };

  const handleLanguageChange = (newLocale: string) => {
    setCurrentLocale(newLocale);
    localStorage.setItem("currentLocale", newLocale);
    // TODO: Update i18n locale
    window.location.reload();
  };

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    // Set initial time
    setCurrentTime(new Date());
    
    return () => clearInterval(timer);
  }, []);

  // Format time as 12-hour with AM/PM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const flagSrc = `/img/icons/langs/flag-${currentLocale}.webp`;

  return (
    <div className="absolute right-0 text-white h-full flex items-center px-1.5 sm:px-3 gap-1 bg-footer-right-component footer-left-shadow select-none">
      {/* Language Selector */}
      <div
        className="flex flex-row items-center justify-center gap-px"
        onClick={toggleLanguageModal}
      >
        <img
          src={flagSrc}
          alt="Language selector"
          className="w-5 h-4 cursor-pointer"
        />
        {isLanguageSettingsDisplayed && (
          <div
            ref={languageModalRef}
            className="absolute bottom-full right-0 mb-1"
          >
            <LanguageModal
              currentLocale={currentLocale}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        )}
      </div>

      <div className="flex items-center h-full">
        {/* Volume Control */}
        <div className="" onClick={toggleVolumeModal}>
          <img
            src="/img/icons/volume-icon-sm.webp"
            alt="Volume control"
            className="w-4 h-4"
          />
          {isVolumeSettingsDisplayed && (
            <div
              ref={musicModalRef}
              className="absolute bottom-full right-0 mb-1"
            >
              <MusicVolumeModal
                volume={volume}
                onVolumeChange={handleVolumeChange}
              />
            </div>
          )}
        </div>

        {/* Fullscreen Toggle */}
        <button
          className="w-4 h-4 cursor-pointer"
          onClick={toggleFullScreen}
          title={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <img
            src="/img/icons/full-screen-icon-sm.webp"
            alt="Fullscreen toggle"
          />
        </button>

        {/* Current Time */}
        <div className="ml-2 flex flex-row">
          <h4 className="mx-px text-[0.7rem] cursor-default">
            <span style={{ verticalAlign: "inherit" }}>{formatTime(currentTime)}</span>
          </h4>
        </div>
      </div>

      {/* Notification Modal */}
      {showNotification && (
        <NotificationModal
          onClose={() => setShowNotification(false)}
          isFullScreen={isFullScreen}
          onToggleFullScreen={toggleFullScreen}
        />
      )}
    </div>
  );
};

export default FooterRight;
