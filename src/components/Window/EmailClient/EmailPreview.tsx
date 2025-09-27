import React from 'react';
import type { Email } from './types';

interface EmailPreviewProps {
  email: Email | null;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ email }) => {
  if (!email) {
    return (
      <div className="email-preview-empty">
        <div className="email-preview-placeholder">
          Select an email to view its contents
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="email-preview">
      {/* Email Header */}
      <div className="email-preview-header">
        <div className="email-preview-subject">{email.subject}</div>
        <div className="email-preview-meta">
          <div className="email-preview-from">
            <strong>From:</strong> {email.from}
          </div>
          <div className="email-preview-date">
            <strong>Date:</strong> {formatDate(email.date)}
          </div>
          <div className="email-preview-to">
            <strong>To:</strong> {email.to}
          </div>
        </div>
        {email.hasAttachment && (
          <div className="email-preview-attachment">
            <img
              src="/img/icons/email/attachment.png"
              alt="Attachment"
              className="email-attachment-icon"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span>This message has attachments</span>
          </div>
        )}
      </div>

      {/* Email Content */}
      <div className="email-preview-content">
        <div className="email-preview-body">
          {email.body.split('\n').map((line, index) => (
            <div key={index} className="email-body-line">
              {line || '\u00A0'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;