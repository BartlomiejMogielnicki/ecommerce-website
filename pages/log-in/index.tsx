import { FC, useContext, useEffect } from 'react';
import { UserContext } from 'context/UserContext'
import { useRouter } from 'next/router'

import Header from 'components/organisms/Header';
import Footer from 'components/atoms/Footer'
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
    <div>
      <header>
        <Header />
      </header>
      <main>
        <LoginContent type="login" />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Contact;
