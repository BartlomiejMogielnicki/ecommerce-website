import { UserProvider } from 'context/UserContext'
import 'styles/globals.scss';
import Layout from 'components/atoms/Layout'

const MyApp = ({ Component, pageProps }) => (
  <UserProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </UserProvider>
)

export default MyApp;
