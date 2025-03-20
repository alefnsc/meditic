export interface Message {
    id: number;
    sender: 'user' | 'ai';
    content: string;
  }