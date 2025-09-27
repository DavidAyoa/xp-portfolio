export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: Date;
  isRead: boolean;
  isImportant: boolean;
  hasAttachment: boolean;
  folderId: string;
}

export interface EmailFolder {
  id: string;
  name: string;
  count: number;
  icon: string;
  children?: EmailFolder[];
}

export interface ContactInfo {
  name: string;
  email: string;
}