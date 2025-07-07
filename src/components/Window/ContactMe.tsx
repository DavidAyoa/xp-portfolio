import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Resend } from 'resend';
import Button from '../Buttons/Button';

interface ContactMeProps {
  // Add any props if needed
}

const ContactMe: React.FC<ContactMeProps> = () => {
  const { t } = useTranslation();
  const [userEmail, setUserEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Get environment variables
  const adminEmailAddress = import.meta.env.VITE_APP_ADMIN_EMAIL_ADDRESS;
  const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userEmail || !userMessage || !emailSubject) {
      setEmailSent(false);
      setErrorMessage(t('windows.contact.error.empty'));
      return;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setEmailSent(false);
      setErrorMessage(userEmail + t('windows.contact.error.email'));
      return;
    }

    setIsLoading(true);

    try {
      const resend = new Resend(resendApiKey);
      
      const { error } = await resend.emails.send({
        from: 'onboarding@resend.dev', // Update this with your verified sender email in Resend
        to: adminEmailAddress,
        replyTo: userEmail,
        subject: emailSubject,
        html: `
          <div>
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${userEmail}</p>
            <p><strong>Subject:</strong> ${emailSubject}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
              ${userMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
        `,
        text: `New Contact Form Submission\n\nFrom: ${userEmail}\nSubject: ${emailSubject}\n\n${userMessage}`
      });

      if (error) {
        throw error;
      }

      // Reset form on success
      setErrorMessage('');
      setUserEmail('');
      setEmailSubject('');
      setUserMessage('');
      setEmailSent(true);
    } catch (error) {
      console.error('Email sending failed:', error);
      setEmailSent(false);
      setErrorMessage(t('windows.contact.error.unknown') + adminEmailAddress);
    } finally {
      setIsLoading(false);
    }
  };

  // Update form completion status
  useEffect(() => {
    setIsFormComplete(!!(userEmail && userMessage && emailSubject));
  }, [userEmail, userMessage, emailSubject]);

  // Handle cursor style when loading
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('cursor-wait');
    } else {
      document.body.classList.remove('cursor-wait');
    }

    return () => {
      document.body.classList.remove('cursor-wait');
    };
  }, [isLoading]);

  return (
    <form 
      className="relative right-0 h-full flex flex-col h-content-headless-toolbox"
      onSubmit={sendEmail}
    >
      {/* Form fields */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Email input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            {t('windows.contact.email')}
          </label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
        </div>

        {/* Subject input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            {t('windows.contact.subject')}
          </label>
          <input
            type="text"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
        </div>

        {/* Message textarea */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            {t('windows.contact.message')}
          </label>
          <textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="w-full p-2 border rounded h-32"
            disabled={isLoading}
          />
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            {errorMessage}
          </div>
        )}

        {/* Success message */}
        {emailSent && (
          <div className="text-green-500 text-sm mb-4">
            {t('windows.contact.success')}
          </div>
        )}
      </div>

      {/* Submit button */}
      <div className="p-4 border-t">
        <Button
          onClick={sendEmail}
          disabled={!isFormComplete || isLoading}
          className="w-full"
        >
          {isLoading ? t('windows.contact.sending') : t('windows.contact.send')}
        </Button>
      </div>
    </form>
  );
};

export default ContactMe;
