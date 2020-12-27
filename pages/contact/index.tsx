import { FC } from 'react';

import Header from 'components/organisms/Header';
import Footer from 'components/atoms/Footer'
import ContactContent from 'components/molecules/ContactContent'

const Contact: FC = () => (
  <div>
    <header>
      <Header />
    </header>
    <main>
      <ContactContent />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
);

export default Contact;
