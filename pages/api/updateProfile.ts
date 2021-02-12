import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'
import auth from 'middleware/auth'

const purchase = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDB()
  const { username, token, userData } = req.body

  try {
    const user = await db
      .collection('users')
      .findOneAndUpdate({ username, 'tokens.token': token }, { $set: { userData } }, { returnOriginal: false })

    if (!user) {
      throw new Error()
    } else {
      res.status(200).send({ userData: user.value.userData })
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' })
  }
}

export default auth(purchase)
