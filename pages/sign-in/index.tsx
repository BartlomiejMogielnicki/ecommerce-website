import { FC, useContext, useEffect } from 'react';

import LoginContent from 'components/organisms/LoginContent/LoginContent'
import { UserContext } from 'context/UserContext'
import { useRouter } from 'next/router'

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
      <LoginContent type="signin" />
    </>
  );
}

export default Contact;
