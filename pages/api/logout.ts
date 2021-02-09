import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', 'remove', {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      }),
    )
    res.status(200).send({})
  } catch (error) {
    res.status(400).send({})
  }
}
