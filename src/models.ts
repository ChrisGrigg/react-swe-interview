export interface User {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  note: string;
}

export interface Note {
  id: number;
  text: string;
}