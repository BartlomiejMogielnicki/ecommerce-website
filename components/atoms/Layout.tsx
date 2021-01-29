import { FC } from 'react'
import Header from 'components/organisms/Header'
import Footer from 'components/atoms/Footer'

const Layout: FC = ({ children }) => (
  <>
    <header>
      <Header />
    </header>
    <main>
      { children }
    </main>
    <footer>
      <Footer />
    </footer>
  </>
)

export default Layout
