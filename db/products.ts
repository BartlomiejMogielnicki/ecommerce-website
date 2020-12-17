import { Db } from 'mongodb'

export const getProducts = async (db: Db) =>
  db
    .collection('products')
    .aggregate([
      {
        $lookup: {
          from: 'upload_file',
          localField: 'image',
          foreignField: '_id',
          as: 'images',
        },
      },
    ])
    .toArray()
