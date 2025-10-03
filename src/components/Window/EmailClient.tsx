import React, { useState } from 'react';
import { WindowDropDowns } from '../Window/WindowDropDowns';
import EmailFolderTree from './EmailClient/EmailFolderTree';
import EmailList from './EmailClient/EmailList';
import EmailPreview from './EmailClient/EmailPreview';
import ComposeEmail from './EmailClient/ComposeEmail';
import type { Email, EmailFolder } from './EmailClient/types';
import { sampleEmails, sampleFolders } from './EmailClient/sampleData';
import './EmailClient/EmailClient.css';

interface EmailClientProps {
  onClose?: () => void;
  onMinimize?: () => void;
  isFocus?: boolean;
}

// Dropdown menu data for Outlook Express style
const dropDownData = {
  File: [
    { type: 'item' as const, text: 'New Message', hotkey: 'Ctrl+N' },
    { type: 'item' as const, text: 'Open...', hotkey: 'Ctrl+O', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Save', hotkey: 'Ctrl+S', disable: true },
    { type: 'item' as const, text: 'Save As...', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Print...', hotkey: 'Ctrl+P', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Exit' }
  ],
  Edit: [
    { type: 'item' as const, text: 'Undo', hotkey: 'Ctrl+Z', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Cut', hotkey: 'Ctrl+X', disable: true },
    { type: 'item' as const, text: 'Copy', hotkey: 'Ctrl+C', disable: true },
    { type: 'item' as const, text: 'Paste', hotkey: 'Ctrl+V', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Select All', hotkey: 'Ctrl+A' }
  ],
  View: [
    { type: 'item' as const, text: 'Toolbar' },
    { type: 'item' as const, text: 'Status Bar' },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Folders' },
    { type: 'item' as const, text: 'Preview Pane' }
  ],
  Tools: [
    { type: 'item' as const, text: 'Send and Receive', hotkey: 'Ctrl+M' },
    { type: 'item' as const, text: 'Address Book...', hotkey: 'Ctrl+Shift+B', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Options...', disable: true }
  ],
  Message: [
    { type: 'item' as const, text: 'Reply', hotkey: 'Ctrl+R', disable: true },
    { type: 'item' as const, text: 'Reply to All', hotkey: 'Ctrl+Shift+R', disable: true },
    { type: 'item' as const, text: 'Forward', hotkey: 'Ctrl+F', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Delete', hotkey: 'Ctrl+D', disable: true }
  ],
  Help: [
    { type: 'item' as const, text: 'Help Topics', hotkey: 'F1' },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'About Outlook Express' }
  ]
};

const EmailClient: React.FC<EmailClientProps> = ({ onClose, onMinimize, isFocus }) => {
  const [selectedFolder, setSelectedFolder] = useState<string>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [emails] = useState<Email[]>(sampleEmails);
  const [folders] = useState<EmailFolder[]>(sampleFolders);
  const [isMaximized, setIsMaximized] = useState(false);

  const filteredEmails = emails.filter(email => email.folderId === selectedFolder);

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedEmail(null);
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleNewMail = () => {
    // Open compose email as a new window by dispatching a custom event
    const event = new CustomEvent('openWindow', { detail: 'composeEmail' });
    window.dispatchEvent(event);
  };

  const handleComposeSend = (emailData: { to: string; subject: string; body: string }) => {
    // Create mailto link with proper encoding
    const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
    window.location.href = mailtoLink;
    setIsComposing(false);
  };

  const handleComposeClose = () => {
    setIsComposing(false);
  };

  function onClickOptionItem(item: string) {
    switch (item) {
      case 'New Message':
        handleNewMail();
        break;
      case 'Exit':
        onClose?.();
        break;
      default:
        break;
    }
  }

  return (
    <div className="email-client">
      {/* Menu Bar */}
      <div className="email-menu-bar">
        <WindowDropDowns
          items={dropDownData}
          onClickItem={onClickOptionItem}
        />
      </div>

      {/* Toolbar */}
      <div className="email-toolbar">
        <button className="email-toolbar-btn" onClick={handleNewMail}>
          <img src="/img/icons/email/new-mail.png" alt="New" />
          <span>New Mail</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="email-content">
        {/* Left Panel - Folder Tree */}
        <div className="email-folders-panel">
          <div className="email-panel-header">Folders</div>
          <EmailFolderTree
            folders={folders}
            selectedFolder={selectedFolder}
            onFolderSelect={handleFolderSelect}
          />
        </div>

        {/* Vertical Splitter */}
        <div className="email-splitter-vertical"></div>

        {/* Right Panel */}
        <div className="email-right-panel">
          {/* Email List */}
          <div className="email-list-panel">
            <EmailList
              emails={filteredEmails}
              selectedEmail={selectedEmail}
              onEmailSelect={handleEmailSelect}
            />
          </div>

          {/* Horizontal Splitter */}
          <div className="email-splitter-horizontal"></div>

          {/* Email Preview */}
          <div className="email-preview-panel">
            <EmailPreview email={selectedEmail} />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="email-status-bar">
        <div className="email-status-text">
          {filteredEmails.length} items in {folders.find(f => f.id === selectedFolder)?.name || 'Folder'}
        </div>
        <div className="email-status-connection">Connected</div>
      </div>
    </div>
  );
};

export default EmailClient;