import React from 'react';
import { Button } from '../Buttons/Button';
import StartButton from '../Buttons/StartButton';
import HeaderLeftButton from '../Buttons/HeaderLeftButton';
import HeaderRightButton from '../Buttons/HeaderRightButton';
import WindowDropdown from '../Buttons/WindowDropdown';

export const TestView: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Button Components Test View</h1>
      
      <div className="space-y-8">
        <section className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Start Button</h2>
          <StartButton className="flex items-center gap-2 p-2 bg-blue-600 text-white rounded">
            <span>Start</span>
          </StartButton>
        </section>

        <section className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Header Left Button</h2>
          <HeaderLeftButton className="p-2 border rounded">
            <span>Left Button</span>
          </HeaderLeftButton>
        </section>

        <section className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Header Right Button</h2>
          <div className="w-32">
            <HeaderRightButton 
              buttonName="test"
              buttonContent={{
                img: <span className="text-xl">📁</span>,
                text: 'Documents'
              }}
              className="p-2 border rounded hover:bg-blue-100"
            />
          </div>
        </section>

        <section className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Window Dropdown</h2>
          <WindowDropdown className="p-2 border rounded w-64">
            <div className="p-2 hover:bg-gray-100">Option 1</div>
            <div className="p-2 hover:bg-gray-100">Option 2</div>
            <div className="p-2 hover:bg-gray-100">Option 3</div>
          </WindowDropdown>
        </section>

        <section className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Default Button</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button layout="small">Small Button</Button>
            <Button isLoading>Loading Button</Button>
            <Button href="#" blank>Link Button</Button>
          </div>
        </section>
        
        {/* Add more component test sections here as needed */}
      </div>
    </div>
  );
};

export default TestView;
