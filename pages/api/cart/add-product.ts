import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'
import auth from 'middleware/auth'

const addProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDB()
  const { product, username, token } = req.body

  try {
    const user = await db
      .collection('users')
      .findOneAndUpdate(
        { username, 'tokens.token': token },
        { $push: { cart: { ...product } } },
        { returnOriginal: false },
      )

    if (!user) {
      throw new Error()
    } else {
      res.status(200).send({ cart: user.value.cart })
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' })
  }
}

export default auth(addProduct)
