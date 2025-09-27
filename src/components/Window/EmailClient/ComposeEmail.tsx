import React, { useState } from 'react';

interface ComposeEmailProps {
  onSend: (emailData: { to: string; subject: string; body: string }) => void;
  onClose: () => void;
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({ onSend, onClose }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    if (to.trim() && subject.trim()) {
      onSend({ to: to.trim(), subject: subject.trim(), body: body.trim() });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="compose-email-overlay" onKeyDown={handleKeyDown}>
      <div className="compose-email-window">
        {/* Window Header */}
        <div className="compose-email-header">
          <div className="compose-email-title">New Message</div>
          <div className="compose-email-controls">
            <button className="compose-email-minimize">_</button>
            <button className="compose-email-maximize">□</button>
            <button className="compose-email-close" onClick={onClose}>×</button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="compose-email-toolbar">
          <button className="compose-email-btn" onClick={handleSend}>
            <img
              src="/img/icons/email/send.png"
              alt="Send"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            Send
          </button>
          <button className="compose-email-btn">
            <img
              src="/img/icons/email/save.png"
              alt="Save"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            Save
          </button>
          <div className="compose-email-separator"></div>
          <button className="compose-email-btn">
            <img
              src="/img/icons/email/attach.png"
              alt="Attach"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            Attach
          </button>
          <button className="compose-email-btn">
            <img
              src="/img/icons/email/priority.png"
              alt="Priority"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            Priority
          </button>
        </div>

        {/* Email Form */}
        <div className="compose-email-form">
          <div className="compose-email-field">
            <label className="compose-email-label">To:</label>
            <input
              type="email"
              className="compose-email-input"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Enter recipient email address"
              autoFocus
            />
          </div>

          <div className="compose-email-field">
            <label className="compose-email-label">Cc:</label>
            <input
              type="email"
              className="compose-email-input"
              placeholder="Carbon copy recipients"
            />
          </div>

          <div className="compose-email-field">
            <label className="compose-email-label">Subject:</label>
            <input
              type="text"
              className="compose-email-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </div>

          <div className="compose-email-body-container">
            <textarea
              className="compose-email-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your message here..."
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="compose-email-status">
          <div className="compose-email-status-text">Ready</div>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmail;