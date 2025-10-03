import React, { useEffect, useRef } from 'react';
import Webamp from 'webamp';

interface WinampProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

// from Webamp demo
const album = 'netBloc Vol. 24: tiuqottigeloot';

const initialTracks = [
  {
    url: 'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Diablo_Swing_Orchestra_-_01_-_Heroines.mp3',
    duration: 322.612245,
    metaData: {
      title: 'Heroines',
      artist: 'Diablo Swing Orchestra',
      album,
    },
  },
  {
    url: 'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Eclectek_-_02_-_We_Are_Going_To_Eclecfunk_Your_Ass.mp3',
    duration: 190.093061,
    metaData: {
      title: 'We Are Going To Eclecfunk Your Ass',
      artist: 'Eclectek',
      album,
    },
  },
  {
    url: 'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Auto-Pilot_-_03_-_Seventeen.mp3',
    duration: 214.622041,
    metaData: {
      title: 'Seventeen',
      artist: 'Auto-Pilot',
      album,
    },
  },
];

function Winamp({ onClose, onMinimize }: WinampProps) {
  const ref = useRef(null);
  const webamp = useRef(null);

  console.log('🎵 Winamp received props:', {
    onClose: typeof onClose,
    onMinimize: typeof onMinimize
  });

  // Ensure callbacks are always functions
  const handleClose = typeof onClose === 'function' ? onClose : () => {
    console.warn('🎵 No onClose callback provided to Winamp!');
  };
  const handleMinimize = typeof onMinimize === 'function' ? onMinimize : () => {
    console.warn('🎵 No onMinimize callback provided to Winamp!');
  };

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    console.log('🎵 Winamp mounting, creating new Webamp instance');

    webamp.current = new Webamp({
      initialTracks,
    });
    webamp.current.renderWhenReady(target).then(() => {
      const webampElement = document.querySelector('#webamp');
      if (webampElement && target) {
        target.appendChild(webampElement);
      }
    });
    return () => {
      console.log('🎵 Winamp unmounting, disposing Webamp instance');
      if (webamp.current) {
        try {
          // Try to dispose, but don't let it crash the app
          webamp.current.dispose();
        } catch (error) {
          console.warn('Webamp disposal failed (this is usually safe during logout):', error);
        }
        webamp.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (webamp.current) {
      console.log('🎵 Setting Webamp callbacks');
      webamp.current.onClose(() => {
        console.log('🎵 Webamp close button clicked!');
        handleClose();
      });
      webamp.current.onMinimize(() => {
        console.log('🎵 Webamp minimize button clicked!');
        handleMinimize();
      });
    }
  });


  return (
    <div
      style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0 }}
      ref={ref}
    />
  );
}

export default Winamp;