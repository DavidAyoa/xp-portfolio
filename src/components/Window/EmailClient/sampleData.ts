import type { Email, EmailFolder } from './types';

export const sampleFolders: EmailFolder[] = [
  {
    id: 'inbox',
    name: 'Inbox',
    count: 5,
    icon: '/img/icons/email/inbox.png'
  },
  {
    id: 'outbox',
    name: 'Outbox',
    count: 0,
    icon: '/img/icons/email/outbox.png'
  },
  {
    id: 'sent',
    name: 'Sent Items',
    count: 3,
    icon: '/img/icons/email/sent.png'
  },
  {
    id: 'deleted',
    name: 'Deleted Items',
    count: 1,
    icon: '/img/icons/email/deleted.png'
  },
  {
    id: 'drafts',
    name: 'Drafts',
    count: 2,
    icon: '/img/icons/email/drafts.png'
  }
];

export const sampleEmails: Email[] = [
  {
    id: '1',
    from: 'john.doe@codepoets.dev',
    to: 'team@codepoets.dev',
    subject: 'Project Update - Windows XP Portfolio',
    body: `Hi Team,

I wanted to give you an update on the Windows XP portfolio project. We've made excellent progress implementing the authentic XP interface.

Key accomplishments:
- Completed the Start Menu with authentic styling
- Implemented Minesweeper game
- Created File Manager component
- Added Winamp music player

Next steps:
- Email client implementation (in progress)
- Additional XP applications
- Performance optimizations

Let me know if you have any questions!

Best regards,
John Doe
Senior Developer
CodePoets Team`,
    date: new Date('2024-01-15T10:30:00'),
    isRead: false,
    isImportant: true,
    hasAttachment: false,
    folderId: 'inbox'
  },
  {
    id: '2',
    from: 'sarah.wilson@client.com',
    to: 'hello@codepoets.dev',
    subject: 'Website Redesign Proposal',
    body: `Dear CodePoets Team,

We're interested in redesigning our company website and would like to discuss the project with you.

Our requirements include:
- Modern responsive design
- E-commerce functionality
- Content management system
- SEO optimization

Could we schedule a meeting next week to discuss the details?

Best regards,
Sarah Wilson
Marketing Director`,
    date: new Date('2024-01-14T14:20:00'),
    isRead: true,
    isImportant: false,
    hasAttachment: true,
    folderId: 'inbox'
  },
  {
    id: '3',
    from: 'newsletter@techworld.com',
    to: 'team@codepoets.dev',
    subject: 'Weekly Tech Newsletter - AI Developments',
    body: `This Week in Technology

🚀 Latest AI Developments
- New breakthrough in language models
- Computer vision advances
- Robotics innovations

💻 Web Development Trends
- React 18 updates
- TypeScript improvements
- New CSS features

🔒 Security Updates
- Important security patches
- Best practices guide
- Threat analysis

Read more at techworld.com`,
    date: new Date('2024-01-13T09:00:00'),
    isRead: true,
    isImportant: false,
    hasAttachment: false,
    folderId: 'inbox'
  },
  {
    id: '4',
    from: 'admin@hosting.com',
    to: 'tech@codepoets.dev',
    subject: 'Server Maintenance Notification',
    body: `Dear Customer,

We will be performing scheduled maintenance on our servers this weekend.

Maintenance window: Saturday 2:00 AM - 6:00 AM EST

During this time, your websites may experience brief interruptions. We apologize for any inconvenience.

If you have any questions, please contact our support team.

Thank you for your understanding.

HostingCo Support Team`,
    date: new Date('2024-01-12T16:45:00'),
    isRead: false,
    isImportant: false,
    hasAttachment: false,
    folderId: 'inbox'
  },
  {
    id: '5',
    from: 'mike.chen@partner.com',
    to: 'hello@codepoets.dev',
    subject: 'Partnership Opportunity',
    body: `Hello CodePoets,

I hope this email finds you well. I'm reaching out regarding a potential partnership opportunity.

Our company specializes in digital marketing and we're looking for talented web development partners to collaborate with on client projects.

Would you be interested in exploring this opportunity? I'd love to set up a call to discuss the details.

Looking forward to hearing from you.

Best,
Mike Chen
Business Development Manager`,
    date: new Date('2024-01-11T11:15:00'),
    isRead: true,
    isImportant: false,
    hasAttachment: false,
    folderId: 'inbox'
  },
  {
    id: '6',
    from: 'team@codepoets.dev',
    to: 'client@example.com',
    subject: 'Project Completed - Thank You!',
    body: `Dear Client,

We're excited to inform you that your website project has been completed successfully!

The new website includes all the requested features and has been thoroughly tested across different devices and browsers.

We've deployed it to your production server and everything is running smoothly.

Thank you for choosing CodePoets for your development needs. We look forward to working with you again in the future.

Best regards,
The CodePoets Team`,
    date: new Date('2024-01-10T15:30:00'),
    isRead: true,
    isImportant: false,
    hasAttachment: false,
    folderId: 'sent'
  }
];