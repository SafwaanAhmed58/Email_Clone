export interface UserDetails {
    userId: number;
    userName: string;
    userEmail: string
}

export interface InboxList {
    toId: number;
    from: string;
    subject: string;
    date: Date;
    email: string;
    mailId: number;
    mailBody: string
}

export interface SentMailList {
    toEmail: string
    toName: string
    fromEmail: string
    fromName: string
    fromId: number
    subject: string
    date: Date
    mailId: number
    mailBody: string

}

export interface ComposeMail {
    to: string;
    subject: string;
    mailBody: string;
    from: string;
    fromName: string;
    fromId: number;

}

export interface ComposeMailResponse {
    status: number;
    message: string;
    sentMaiId: number;
}