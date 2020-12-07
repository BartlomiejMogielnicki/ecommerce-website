import { Db } from 'mongodb';

export const getProducts = async (db: Db) => {
  return db.collection('products').find().toArray();
};
