import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

interface PictureGalleryProps {
  folder: string;
}

const PictureGallery: React.FC<PictureGalleryProps> = ({ folder }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'scroll'>('carousel');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Load images from the folder
    const imageFiles = [
      `/pictures/${folder}/c1.jpg`,
      `/pictures/${folder}/c2.jpg`,
      `/pictures/${folder}/c3.jpg`,
      `/pictures/${folder}/c4.jpg`,
      `/pictures/${folder}/c5.jpg`,
      `/pictures/${folder}/c6.jpg`,
    ];
    setImages(imageFiles);
  }, [folder]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (viewMode === 'carousel') {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  };

  return (
    <div
      className="w-full h-full bg-white flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Toolbar */}
      <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-3 gap-2">
        <button
          onClick={() => setViewMode('carousel')}
          className={clsx(
            'px-3 py-1 text-xs border rounded',
            viewMode === 'carousel' ? 'bg-blue-500 text-white border-blue-600' : 'bg-white border-gray-300'
          )}
        >
          Carousel
        </button>
        <button
          onClick={() => setViewMode('scroll')}
          className={clsx(
            'px-3 py-1 text-xs border rounded',
            viewMode === 'scroll' ? 'bg-blue-500 text-white border-blue-600' : 'bg-white border-gray-300'
          )}
        >
          Scroll
        </button>
        <div className="flex-1" />
        <span className="text-xs text-gray-600">
          {images.length} images
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto relative">
        {viewMode === 'carousel' ? (
          // Carousel Mode
          <div className="w-full h-full flex flex-col items-center justify-center bg-black p-4">
            {images.length > 0 && (
              <>
                <img
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain cursor-pointer"
                  onClick={() => setSelectedImage(images[currentIndex])}
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                  <button
                    onClick={prevImage}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-semibold"
                  >
                    ← Previous
                  </button>
                  <span className="text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={nextImage}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-semibold"
                  >
                    Next →
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          // Scroll Mode
          <div className="p-4 grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square bg-gray-100 border border-gray-300 overflow-hidden cursor-pointer hover:border-blue-500"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full-screen image viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-[90%] max-h-[90%] object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold bg-black/50 w-10 h-10 rounded-full hover:bg-black/70"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default PictureGallery;
