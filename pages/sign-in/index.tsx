import { FC } from 'react';

import Header from 'components/organisms/Header';
import Footer from 'components/atoms/Footer'
import LoginContent from 'components/organisms/LoginContent/LoginContent'

const Contact: FC = () => (
  <div>
    <header>
      <Header />
    </header>
    <main>
      <LoginContent />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
);

export default Contact;
