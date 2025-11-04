import React, { useEffect, useRef } from 'react';
import Webamp from 'webamp';

interface WinampProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

const album = 'CodePoets Playlist';

const initialTracks = [
  {
    url: '/music/Arz Kiya Hai - Anuv Jain.mp3',
    metaData: {
      title: 'Arz Kiya Hai',
      artist: 'Anuv Jain',
      album,
    },
  },
  {
    url: '/music/ISHQ - Faheem Abdullah, Rauhan Malik (Lyrics) _ #trending [gKD1AhmpOoU].mp3',
    metaData: {
      title: 'ISHQ',
      artist: 'Faheem Abdullah, Rauhan Malik',
      album,
    },
  },
  {
    url: '/music/Maand - Ajima.mp3',
    metaData: {
      title: 'Maand',
      artist: 'Ajima',
      album,
    },
  },
  {
    url: '/music/Saal - Ishpreet Singh.mp3',
    metaData: {
      title: 'Saal',
      artist: 'Ishpreet Singh',
      album,
    },
  },
  {
    url: '/music/Uyiril Thodum - Kumbalangi Nights.mp3',
    metaData: {
      title: 'Uyiril Thodum',
      artist: 'Kumbalangi Nights',
      album,
    },
  },
  {
    url: '/music/Water Packet - Raayan.mp3',
    metaData: {
      title: 'Water Packet',
      artist: 'Raayan',
      album,
    },
  },
  {
    url: '/music/Zulfaan - SARRB  Starboy X.mp3',
    metaData: {
      title: 'Zulfaan',
      artist: 'SARRB Starboy X',
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