import React from 'react';
import ContentCenter from '../layouts/ContentCenter';

const Step3Loading: React.FC = () => {
  return (
    <ContentCenter className="bg-color-load-blue radial-gradient-loading">
      <div slot="top" className="absolute bg-color-load-header-blue w-full md:h-32 h-1/6 top-0 down-stroke-white-2"></div>

      <div slot="center">
      </div>

      <div slot="bottom" className="absolute bg-color-load-header-blue w-full md:h-48 h-28 bottom-0 up-stroke-green-2">
        <div className="flex justify-center items-center h-full"></div>
      </div>
    </ContentCenter>
  );
};

export default Step3Loading;