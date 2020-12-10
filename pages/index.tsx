import Head from 'next/head';
import { FC } from 'react';

import HomeContent from 'components/organisms/HomeContent/HomeContent'
import Header from 'components/organisms/Header';

const Home: FC = () => (
  <div>
    <Head>
      <title>Ecommerce website</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <Header />
    </header>
    <main>
      <HomeContent />
    </main>
    <footer />
  </div>
);

export default Home;
