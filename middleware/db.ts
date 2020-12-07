import { connectToDB } from '../db/connect';

declare global {
  namespace NodeJS {
    interface Global {
      mongo: any;
    }
  }
}

export default async function database(req, res, next) {
  const { db } = await connectToDB();
  req.db = db;

  next();
}
