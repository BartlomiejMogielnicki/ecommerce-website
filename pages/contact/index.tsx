import { FC } from 'react';

import Header from 'components/organisms/Header';
import Footer from 'components/atoms/Footer'
import ContactContent from 'components/molecules/ContactContent'
import Map from 'components/atoms/Map'

const Contact: FC = () => (
  <div>
    <header>
      <Header />
    </header>
    <main>
      <ContactContent />
      <Map />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
);

export default Contact;
