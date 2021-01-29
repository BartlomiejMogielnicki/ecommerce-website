import { FC, useContext, useEffect } from 'react';
import { UserContext } from 'context/UserContext'
import { useRouter } from 'next/router'

import LoginContent from 'components/organisms/LoginContent/LoginContent'

const Contact: FC = () => {
  const { user: { authenticated } } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (authenticated) {
      router.push('/')
    }
  }, [authenticated, router])

  return (
    <>
      <LoginContent type="login" />
    </>
  )
}

export default Contact;
