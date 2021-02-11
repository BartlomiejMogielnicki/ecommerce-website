import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'
import auth from 'middleware/auth'

const purchase = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDB()
  const { username, token, cart } = req.body

  const orderDate = new Date().toLocaleString('en-GB')
  const orderStatus = 'In progress'

  try {
    const user = await db
      .collection('users')
      .findOneAndUpdate(
        { username, 'tokens.token': token },
        { $push: { history: { orderDate, orderStatus, cart: [...cart] } }, $set: { cart: [] } },
        { returnOriginal: false },
      )

    if (!user) {
      throw new Error()
    } else {
      res.status(200).send({ cart: user.value.cart, history: user.value.history })
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' })
  }
}

export default auth(purchase)
