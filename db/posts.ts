import { Db } from 'mongodb'

export const getPosts = async (db: Db) => db.collection('posts').find().toArray()
