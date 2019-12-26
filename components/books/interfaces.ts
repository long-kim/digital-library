import { firestore } from 'firebase';

export interface IUser {
  name: string;
  imageURL?: string;
}

export interface IBook extends firestore.DocumentData {
  name: string;
  author?: string;
  overview?: string;
  rating: number;
  cate: string[];
}
