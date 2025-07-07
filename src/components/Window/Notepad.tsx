import React, { useState } from 'react';

const Notepad: React.FC = () => {
  const [noteContent, setNoteContent] = useState('');

  return (
    <div className="relative right-0 h-full flex">
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        className="w-full h-content-headless-toolbox bg-white overflow-y-scroll outline-none resize-none px-1 font-trebuchet-pixel text-md"
      />
    </div>
  );
};

export default Notepad;
