import React from 'react';

const LoadingBar: React.FC = () => {
  return (
    <div className="loading-bar my-11 overflow-hidden rounded-md px-px py-px gap-0.5 h-7 flex items-center md:w-60 w-30">
      <div className="loading-box inline-block h-5/6 w-8 md:w-4"></div>
      <div className="loading-box inline-block h-5/6 w-8 md:w-4"></div>
      <div className="loading-box inline-block h-5/6 w-8 md:w-4"></div>
    </div>
  );
};

export default LoadingBar;