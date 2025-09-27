import React from 'react';
import type { Email } from './types';

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onEmailSelect: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  selectedEmail,
  onEmailSelect
}) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else if (daysDiff < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="email-list">
      {/* Header */}
      <div className="email-list-header">
        <div className="email-list-column email-col-importance"></div>
        <div className="email-list-column email-col-attachment"></div>
        <div className="email-list-column email-col-from">From</div>
        <div className="email-list-column email-col-subject">Subject</div>
        <div className="email-list-column email-col-date">Received</div>
      </div>

      {/* Email Items */}
      <div className="email-list-items">
        {emails.length === 0 ? (
          <div className="email-list-empty">
            This folder is empty.
          </div>
        ) : (
          emails.map(email => (
            <div
              key={email.id}
              className={`email-list-item ${
                selectedEmail?.id === email.id ? 'selected' : ''
              } ${!email.isRead ? 'unread' : ''}`}
              onClick={() => onEmailSelect(email)}
            >
              <div className="email-list-column email-col-importance">
                {email.isImportant && (
                  <span className="email-importance-icon">!</span>
                )}
              </div>
              <div className="email-list-column email-col-attachment">
                {email.hasAttachment && (
                  <img
                    src="/img/icons/email/attachment.png"
                    alt="Attachment"
                    className="email-attachment-icon"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
              </div>
              <div className="email-list-column email-col-from">
                {email.from}
              </div>
              <div className="email-list-column email-col-subject">
                {email.subject}
              </div>
              <div className="email-list-column email-col-date">
                {formatDate(email.date)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmailList;