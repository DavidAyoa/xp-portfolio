import React from 'react';

const LoadingBar: React.FC = () => {
  return (
    <div className="loading-bar my-11 overflow-hidden rounded-md px-px py-px gap-0.5 lg:w-96 md:w-7/12 w-10/12 h-7 max-w-sm flex items-center">
      <div className="loading-box inline-block h-5/6 w-4"></div>
      <div className="loading-box inline-block h-5/6 w-4"></div>
      <div className="loading-box inline-block h-5/6 w-4"></div>
    </div>
  );
};

export default LoadingBar;
