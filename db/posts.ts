import { Db } from 'mongodb';

export const getPosts = async (db: Db) => {
  return db.collection('posts').find().toArray();
};
