import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { connectToDB } from 'db/connect'

export default async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()
  const { title } = req.body

  try {
    const token = req.cookies.auth
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await db.collection('users').findOne({
      username: decoded._id,
      'tokens.token': token,
    })

    const updatedUser = await db
      .collection('users')
      .findOneAndUpdate(
        { username: decoded._id, 'tokens.token': token },
        { $pull: { cart: { title } } },
        { returnOriginal: false },
      )

    if (!user) {
      throw new Error()
    } else {
      res.status(200).send({ cart: updatedUser.value.cart })
    }
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}
