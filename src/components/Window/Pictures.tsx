import React from 'react';

const Pictures: React.FC = () => {
  return (
    <div className="p-4 h-full overflow-auto bg-white">
      <div className="font-mono text-sm">
        <h1 className="text-lg font-bold mb-4">🖼️ Pictures</h1>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 border border-gray-300 flex items-center justify-center text-xs">
              Photo {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pictures;