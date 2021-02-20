import { FC, useEffect, useState } from 'react'
import Header from 'components/organisms/Header'
import Footer from 'components/atoms/Footer'
import Head from 'next/head'

const moveContentStyles = {
  transition: '.3s',
  transform: 'translateY(105px)',
}

const defaultContentStyles = {
  transition: '.3s',
}

const Layout: FC = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)

  // Set main section position to default
  const checkWidth = () => {
    if (window.innerWidth > 550) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  return (
    <>
      <Head>
        <title>GoFakeShop action cameras shop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Action cameras shop website. Buy the best action cameras. Read articles about the best action cameras. Contact for advice about best action cameras." />
        <meta name="keywords" content="gopro, action cameras, cameras, hero, video, photo, media" />
      </Head>
      <header>
        <Header clicked={() => setShowMenu(!showMenu)} showMenu={showMenu} />
      </header>
      <main style={showMenu ? moveContentStyles : defaultContentStyles}>
        { children }
      </main>
      <footer style={showMenu ? moveContentStyles : defaultContentStyles}>
        <Footer />
      </footer>
    </>
  )
}

export default Layout
