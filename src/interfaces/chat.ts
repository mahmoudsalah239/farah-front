export interface Chat {
  chatId: number;
  user: User;
  lastMessage: string;
  lastMessageSentAt: string;
  isRead: boolean;
  iamTheLastMessageSender: boolean;
}

export interface User {
  id: string;
  userName: string;
  profileImage: string;
}
