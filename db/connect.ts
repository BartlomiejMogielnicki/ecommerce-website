import { Db, MongoClient } from 'mongodb';

global.mongo = global.mongo || {};

export const connectToDB = async () => {
  if (
    Object.keys(global.mongo).length === 0 &&
    global.mongo.constructor === Object
  ) {
    global.mongo.client = new MongoClient(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    });

    console.log('connecting to DB');
    await global.mongo.client.connect();
    console.log('connected to DB');
  }

  const db: Db = global.mongo.client.db('ecommerce-website');

  return { db };
};
