
export type Sender = 'user' | 'model';

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  image?: string; 
  file?: {
    name: string;
    type: string;
  };
}
