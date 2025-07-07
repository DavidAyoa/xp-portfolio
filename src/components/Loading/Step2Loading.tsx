import React from 'react';
import ContentCenter from '../../layouts/ContentCenter';
import LoadingBar from './LoadingBar';

const Step2Loading: React.FC = () => {
  return (
    <ContentCenter className="bg-black">
      <div slot="center" className="md:w-4/12 w-64 ml-5">
        <img src="/img/logo-portfolio-white.png" alt="Logo" />
      </div>

      <div slot="bottom-center">
        <LoadingBar />
      </div>

      <div slot="bottom" className="app-container absolute bottom-0 md:my-16 my-8">
        <div>
          <div className="flex justify-between items-center gap-8 text-white">
            <div>
              <h1 className="md:text-xl text-sm font-tahoma">Welcome</h1>
            </div>
            <div>
              <h2 className="md:text-2xl text-md tracking-tighter font-helvetica-black-italic font-semibold">
                UnMugViolet
              </h2>
            </div>
          </div>
        </div>
      </div>
    </ContentCenter>
  );
};

export default Step2Loading;
