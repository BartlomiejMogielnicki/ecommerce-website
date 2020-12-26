import { FC } from 'react';

import Header from 'components/organisms/Header';
import Footer from 'components/atoms/Footer'
import RegulationsContent from 'components/molecules/RegulationsContent'

const Regulations: FC = () => (
  <div>
    <header>
      <Header />
    </header>
    <main>
      <RegulationsContent />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
);

export default Regulations;
