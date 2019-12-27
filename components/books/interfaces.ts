import { firestore } from 'firebase';

export interface IUser {
  fullName: string;
  photoURL?: string;
  [field: string]: any;
}

export interface IBook extends firestore.DocumentData {
  name: string;
  author?: string;
  overview?: string;
  rating: number;
  img: string[];
}
