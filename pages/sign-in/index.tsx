import { FC, useContext, useEffect } from 'react';

import Header from 'components/organisms/Header';
import Footer from 'components/atoms/Footer'
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
    <div>
      <header>
        <Header />
      </header>
      <main>
        <LoginContent type="signin" />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Contact;
