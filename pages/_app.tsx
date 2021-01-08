import { UserProvider } from 'context/UserContext'
import 'styles/globals.scss';

const MyApp = ({ Component, pageProps }) => (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
)

export default MyApp;
