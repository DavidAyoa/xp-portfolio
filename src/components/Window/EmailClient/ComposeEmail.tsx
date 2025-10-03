import React, { useState } from 'react';

interface ComposeEmailProps {
  onSend: (emailData: { to: string; subject: string; body: string }) => void;
  onClose?: () => void;
  onMinimize?: () => void;
  isFocus?: boolean;
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({ onSend }) => {
  const [to, setTo] = useState('hello@codepoets.dev');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    if (to.trim() && subject.trim()) {
      onSend({ to: to.trim(), subject: subject.trim(), body: body.trim() });
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white"
      style={{
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '11px'
      }}
    >
      {/* Toolbar */}
      <div className="compose-email-toolbar">
        <button className="compose-email-btn" onClick={handleSend}>
          <img
            src="/img/icons/email/send-receive.png"
            alt="Send"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/windowsIcons/forward.png';
            }}
          />
          Send
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
  );
};

export default ComposeEmail;
