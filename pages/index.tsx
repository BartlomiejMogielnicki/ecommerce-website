import Head from 'next/head';
import { FC } from 'react';

import Header from '../components/organisms/Header'

const Home: FC = () => {
  return (
    <div>
      <Head>
        <title>Ecommerce website</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Header/>
      </header>
      <main>
      </main>
      <footer></footer>
    </div>
  );
}

export default Home;