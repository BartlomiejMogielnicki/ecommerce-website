import { ObjectId } from 'mongodb';

export interface Product {
  _id: string;
  title: string;
  category: string;
  image: string;
  shortDescription: string;
  description: string;
  price: string;
  quantity: number;
}
