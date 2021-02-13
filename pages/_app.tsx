import { UserProvider } from 'context/UserContext'
import 'styles/globals.scss';
import Layout from 'layout/Layout'

const MyApp = ({ Component, pageProps }) => (
  <UserProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </UserProvider>
)

export default MyApp;
