import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'
import auth from 'middleware/auth'

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDB()
  const { title, username, token } = req.body

  try {
    const user = await db
      .collection('users')
      .findOneAndUpdate({ username, 'tokens.token': token }, { $pull: { cart: { title } } }, { returnOriginal: false })

    if (!user) {
      throw new Error()
    } else {
      res.status(200).send({ cart: user.value.cart })
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' })
  }
}

export default auth(deleteProduct)
