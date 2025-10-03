import React from 'react';

const Pictures: React.FC = () => {
  // Sample images - you can replace these with actual team/company photos
  const images = [
    { name: 'Team Photo 2024', src: '/img/sample-team.jpg' },
    { name: 'Office Space', src: '/img/sample-office.jpg' },
    { name: 'Project Launch', src: '/img/sample-launch.jpg' },
    { name: 'Company Event', src: '/img/sample-event.jpg' },
    { name: 'Awards Ceremony', src: '/img/sample-awards.jpg' },
    { name: 'Workshop Session', src: '/img/sample-workshop.jpg' },
  ];

  return (
    <div className="h-full overflow-auto bg-white" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      <div className="p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
          {images.map((image, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200"
              style={{ maxWidth: '140px' }}
            >
              {/* Thumbnail */}
              <div
                className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center mb-2"
                style={{
                  width: '100px',
                  height: '100px',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={image.src}
                  alt={image.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('.placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'placeholder text-gray-400 text-xs text-center';
                      placeholder.textContent = '📷';
                      placeholder.style.fontSize = '32px';
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>
              {/* Filename */}
              <div
                className="text-center break-words w-full"
                style={{
                  fontSize: '11px',
                  lineHeight: '1.2',
                  color: '#000'
                }}
              >
                {image.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pictures;