import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import WindowLeftMenu from './WindowLeftMenu';

interface Picture {
  id: number;
  url: string;
  name: string;
}

interface PicturesProps {
  leftMenuType?: string;
}

const Pictures: React.FC<PicturesProps> = ({ leftMenuType }) => {
  const { t } = useTranslation();
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  // Sample pictures data - replace with your actual data source
  useEffect(() => {
    // This should be replaced with your actual data fetching logic
    const samplePictures: Picture[] = [
      { id: 1, url: '/img/sample1.jpg', name: 'Sample 1' },
      { id: 2, url: '/img/sample2.jpg', name: 'Sample 2' },
      // Add more sample images as needed
    ];
    setPictures(samplePictures);
  }, []);

  const currentPicture = pictures[currentIndex];

  const nextPicture = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pictures.length);
  };

  const previousPicture = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
    );
  };

  const rotateLeft = () => {
    setRotation((prevRotation) => (prevRotation - 90) % 360);
  };

  const rotateRight = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const setCurrentPicture = (index: number) => {
    if (index >= 0 && index < pictures.length) {
      setCurrentIndex(index);
    }
  };

  // Auto-scroll the preview to show the current picture
  useEffect(() => {
    if (previewRef.current && previewRef.current.children[currentIndex]) {
      const element = previewRef.current.children[currentIndex] as HTMLElement;
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative right-0 h-content-window flex overflow-hidden">
      {leftMenuType && <WindowLeftMenu leftMenuType={leftMenuType} />}
      
      {/* Main content */}
      <div className="w-full h-full bg-pictures-blue overflow-x-hidden">
        {/* Image display */}
        <div className="flex flex-col justify-center items-center w-full h-9/12 gap-1">
          {currentPicture ? (
            <div className="w-3/4 h-5/6 mt-1 border border-black overflow-hidden">
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${currentPicture.url})`,
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease-in-out'
                }}
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}
          
          {/* Controls */}
          <div className="flex py-2">
            <div className="flex gap-0.5">
              <button
                onClick={previousPicture}
                disabled={pictures.length <= 1}
                className="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img 
                  src="/img/icons/pictures/previous-icon.svg" 
                  alt={t('windows.pictures.previous')} 
                />
              </button>
              <button
                onClick={nextPicture}
                disabled={pictures.length <= 1}
                className="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img 
                  src="/img/icons/pictures/next-icon.svg" 
                  alt={t('windows.pictures.next')} 
                />
              </button>
            </div>
            
            <hr className="w-px mx-2 h-full bg-moon-mist" />
            
            <div className="flex">
              <button
                onClick={rotateLeft}
                className="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1"
              >
                <img 
                  src="/img/icons/pictures/left.svg" 
                  alt={t('windows.pictures.rotateLeft')} 
                />
              </button>
              <button
                onClick={rotateRight}
                className="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1"
              >
                <img 
                  src="/img/icons/pictures/right.svg" 
                  alt={t('windows.pictures.rotateRight')} 
                />
              </button>
            </div>
          </div>
        </div>
        
        {/* Thumbnails */}
        {pictures.length > 0 && (
          <div className="h-3/12 px-4 pb-4">
            <div className="flex overflow-x-auto gap-2 pt-2" ref={previewRef}>
              {pictures.map((pic, index) => (
                <div 
                  key={pic.id}
                  onClick={() => setCurrentPicture(index)}
                  className={`flex-shrink-0 w-16 h-16 border-2 cursor-pointer ${
                    index === currentIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={pic.url} 
                    alt={pic.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pictures;
