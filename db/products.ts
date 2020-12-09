import { Db } from 'mongodb'

export const getProducts = async (db: Db) => db.collection('products').find().toArray()
