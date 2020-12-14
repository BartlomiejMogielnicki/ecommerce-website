import Head from 'next/head';
import { FC } from 'react';
import { Product } from 'types';
import { getProducts } from 'db/products';
import { connectToDB } from 'db/connect';

import HomeContent from 'components/organisms/HomeContent/HomeContent'
import Header from 'components/organisms/Header';

interface Props {
  bestsellers: Product[]
}

const Home: FC<Props> = ({ bestsellers }) => (
  <div>
    <Head>
      <title>Ecommerce website</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <Header />
    </header>
    <main>
      <HomeContent bestsellers={bestsellers} />
    </main>
    <footer />
  </div>
);

export async function getStaticProps() {
  const { db } = await connectToDB();
  const fetchedProducts = await getProducts(db);
  const bestsellers = fetchedProducts.filter((product) => (
    product.bestseller
  )).map((p) => ({
    title: p.title,
    category: p.category,
    shortDescription: p.shortDescription,
    description: p.description,
    price: p.price,
    quantity: p.quantity,
  }));

  return {
    props: {
      bestsellers,
    },
  };
}

export default Home;
