import React, { useState } from 'react';
import { WindowDropDowns } from './WindowDropDowns';

interface ContactMeProps {
  onClose?: () => void;
}

// Dropdown menu data for Outlook Express style
const dropDownData = {
  File: [
    { type: 'item' as const, text: 'Send Message', hotkey: 'Ctrl+Enter' },
    { type: 'item' as const, text: 'Save', hotkey: 'Ctrl+S', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Close' }
  ],
  Edit: [
    { type: 'item' as const, text: 'Undo', hotkey: 'Ctrl+Z', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Cut', hotkey: 'Ctrl+X' },
    { type: 'item' as const, text: 'Copy', hotkey: 'Ctrl+C' },
    { type: 'item' as const, text: 'Paste', hotkey: 'Ctrl+V' },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Select All', hotkey: 'Ctrl+A' }
  ],
  View: [
    { type: 'item' as const, text: 'Toolbar' },
    { type: 'item' as const, text: 'Status Bar' }
  ],
  Insert: [
    { type: 'item' as const, text: 'File Attachment...', disable: true },
    { type: 'item' as const, text: 'Picture...', disable: true },
    { type: 'item' as const, text: 'Hyperlink...', disable: true }
  ],
  Format: [
    { type: 'item' as const, text: 'Font...', disable: true },
    { type: 'item' as const, text: 'Paragraph...', disable: true }
  ],
  Tools: [
    { type: 'item' as const, text: 'Spelling', hotkey: 'F7', disable: true }
  ],
  Help: [
    { type: 'item' as const, text: 'Help Topics' },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'About' }
  ]
};

const ContactMe: React.FC<ContactMeProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSend = () => {
    const { name, email, subject, message } = formData;

    // Create mailto link
    const mailtoLink = `mailto:hello@codepoets.dev?subject=${encodeURIComponent(subject || 'Contact from Portfolio')}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Show confirmation
    alert('Opening your default email client...');
  };

  function onClickOptionItem(item: string) {
    switch (item) {
      case 'Send Message':
        handleSend();
        break;
      case 'Close':
        onClose?.();
        break;
      default:
        break;
    }
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      fontFamily: 'Tahoma, sans-serif',
      fontSize: '11px'
    }}>
      {/* Menu Bar */}
      <section style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '24px',
        borderBottom: '1px solid #d4d0c8',
        backgroundColor: '#f0f0f0',
        flexShrink: 0
      }}>
        <div style={{
          height: '23px',
          borderBottom: '1px solid #919b9c',
          paddingLeft: '2px',
          paddingRight: '2px',
          flex: 1
        }}>
          <WindowDropDowns
            items={dropDownData}
            onClickItem={onClickOptionItem}
          />
        </div>
      </section>

      {/* Toolbar */}
      <section style={{
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '4px',
        paddingRight: '4px',
        gap: '2px',
        borderBottom: '1px solid #d4d0c8',
        backgroundColor: '#f0f0f0',
        flexShrink: 0
      }}>
        <button
          onClick={handleSend}
          style={{
            height: '28px',
            padding: '0 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            border: '1px solid #003c74',
            borderRadius: '3px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            fontSize: '11px',
            fontFamily: 'Tahoma, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e8f4fd';
            e.currentTarget.style.borderColor = '#0078d7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.borderColor = '#003c74';
          }}
        >
          📧 <span>Send</span>
        </button>
      </section>

      {/* Form Fields */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header Fields */}
        <div style={{
          padding: '8px',
          borderBottom: '1px solid #d4d0c8',
          backgroundColor: '#f0f0f0',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <label style={{ width: '60px', fontWeight: 'bold', fontSize: '11px' }}>To:</label>
            <input
              type="text"
              value="hello@codepoets.dev"
              readOnly
              style={{
                flex: 1,
                height: '21px',
                padding: '2px 4px',
                border: '1px solid #7f9db9',
                backgroundColor: '#e8e8e8',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <label style={{ width: '60px', fontWeight: 'bold', fontSize: '11px' }}>From:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              style={{
                flex: 1,
                height: '21px',
                padding: '2px 4px',
                border: '1px solid #7f9db9',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <label style={{ width: '60px', fontWeight: 'bold', fontSize: '11px' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              style={{
                flex: 1,
                height: '21px',
                padding: '2px 4px',
                border: '1px solid #7f9db9',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '60px', fontWeight: 'bold', fontSize: '11px' }}>Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter subject"
              style={{
                flex: 1,
                height: '21px',
                padding: '2px 4px',
                border: '1px solid #7f9db9',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif'
              }}
            />
          </div>
        </div>

        {/* Message Body */}
        <div style={{ flex: 1, padding: '8px', backgroundColor: '#fff', overflow: 'auto' }}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              resize: 'none',
              outline: 'none',
              fontSize: '11px',
              fontFamily: 'Tahoma, sans-serif',
              lineHeight: '1.5'
            }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div style={{
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '8px',
        paddingRight: '8px',
        borderTop: '1px solid #d4d0c8',
        backgroundColor: '#f0f0f0',
        fontSize: '11px',
        flexShrink: 0
      }}>
        <div>Ready</div>
      </div>
    </div>
  );
};

export default ContactMe;
