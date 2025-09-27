import React from 'react';
import type { EmailFolder } from './types';

interface EmailFolderTreeProps {
  folders: EmailFolder[];
  selectedFolder: string;
  onFolderSelect: (folderId: string) => void;
}

const EmailFolderTree: React.FC<EmailFolderTreeProps> = ({
  folders,
  selectedFolder,
  onFolderSelect
}) => {
  return (
    <div className="email-folder-tree">
      {folders.map(folder => (
        <div
          key={folder.id}
          className={`email-folder-item ${selectedFolder === folder.id ? 'selected' : ''}`}
          onClick={() => onFolderSelect(folder.id)}
        >
          <div className="email-folder-content">
            <img
              src={folder.icon || '/img/icons/folder.png'}
              alt={folder.name}
              className="email-folder-icon"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/img/icons/folder.png';
              }}
            />
            <span className="email-folder-name">{folder.name}</span>
            {folder.count > 0 && (
              <span className="email-folder-count">({folder.count})</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailFolderTree;