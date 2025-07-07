import React from 'react';
import type { ReactNode } from 'react';

interface ContentCenterProps {
  children?: ReactNode;
  className?: string;
}

const ContentCenter: React.FC<ContentCenterProps> = ({ children, className = '' }) => {
  const slots: { [key: string]: ReactNode[] } = {};

  React.Children.forEach(children, (child) => {
    if (React.isValidElement<{ slot?: string }>(child) && child.props.slot) {
      const slotName = child.props.slot;
      if (!slots[slotName]) {
        slots[slotName] = [];
      }
      slots[slotName].push(child);
    }
  });

  return (
    <section className={`h-svh w-screen overflow-hidden ${className}`}>
      <div className="flex items-center justify-center h-full w-full">
        {slots['top']}
        <div className="app-container relative">
          <div className="flex flex-col items-center justify-center w-full h-full">
            {slots['center']}
            {slots['bottom-center']}
          </div>
        </div>
        {slots['bottom']}
      </div>
    </section>
  );
};

export default ContentCenter;
