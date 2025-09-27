import React from 'react';

interface PaintProps {
  onClose?: () => void;
  isFocus?: boolean;
}

const Paint: React.FC<PaintProps> = ({ isFocus = true }) => {
  return (
    <div style={{ height: '100%', background: 'rgb(192,192,192)' }}>
      <iframe
        src="https://jspaint.app"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title="Paint"
      />
      {!isFocus && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            zIndex: 1
          }}
        />
      )}
    </div>
  );
};

export default Paint;