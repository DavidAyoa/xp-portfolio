import React, { useState } from 'react';
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

const EmailClient: React.FC<EmailClientProps> = ({ onClose, onMinimize, isFocus }) => {
  const [selectedFolder, setSelectedFolder] = useState<string>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [emails] = useState<Email[]>(sampleEmails);
  const [folders] = useState<EmailFolder[]>(sampleFolders);

  const filteredEmails = emails.filter(email => email.folderId === selectedFolder);

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedEmail(null);
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleNewMail = () => {
    setIsComposing(true);
  };

  const handleComposeSend = (emailData: { to: string; subject: string; body: string }) => {
    console.log('Sending email:', emailData);
    setIsComposing(false);
  };

  const handleComposeClose = () => {
    setIsComposing(false);
  };

  return (
    <div className="email-client">
      {/* Menu Bar */}
      <div className="email-menu-bar">
        <div className="email-menu-item">File</div>
        <div className="email-menu-item">Edit</div>
        <div className="email-menu-item">View</div>
        <div className="email-menu-item">Tools</div>
        <div className="email-menu-item">Message</div>
        <div className="email-menu-item">Help</div>
      </div>

      {/* Toolbar */}
      <div className="email-toolbar">
        <button className="email-toolbar-btn" onClick={handleNewMail}>
          <img src="/img/icons/email/new-mail.png" alt="New" />
          <span>New Mail</span>
        </button>
        <button className="email-toolbar-btn">
          <img src="/img/icons/email/send-receive.png" alt="Send/Recv" />
          <span>Send/Recv</span>
        </button>
        <div className="email-toolbar-separator"></div>
        <button className="email-toolbar-btn" disabled={!selectedEmail}>
          <img src="/img/icons/email/reply.png" alt="Reply" />
          <span>Reply</span>
        </button>
        <button className="email-toolbar-btn" disabled={!selectedEmail}>
          <img src="/img/icons/email/reply-all.png" alt="Reply All" />
          <span>Reply All</span>
        </button>
        <button className="email-toolbar-btn" disabled={!selectedEmail}>
          <img src="/img/icons/email/forward.png" alt="Forward" />
          <span>Forward</span>
        </button>
        <div className="email-toolbar-separator"></div>
        <button className="email-toolbar-btn" disabled={!selectedEmail}>
          <img src="/img/icons/email/delete.png" alt="Delete" />
          <span>Delete</span>
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

      {/* Compose Email Modal */}
      {isComposing && (
        <ComposeEmail
          onSend={handleComposeSend}
          onClose={handleComposeClose}
        />
      )}
    </div>
  );
};

export default EmailClient;