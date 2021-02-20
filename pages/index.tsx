import { FC } from 'react';
import { Product, Post } from 'types';
import { getProducts } from 'db/products';
import { getPosts } from 'db/posts';
import { connectToDB } from 'db/connect';

import HomeContent from 'components/organisms/HomeContent/HomeContent'

interface Props {
  bestsellers: Product[],
  recentPosts: Post[],
  cookie?: string
}

const Home: FC<Props> = ({ bestsellers, recentPosts }) => (
  <HomeContent bestsellers={bestsellers} recentPosts={recentPosts} />
)

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
    images: p.images.map((item) => ({
      name: item.name,
      url: item.url,
    })),
  }));

  const fetchedPosts = await getPosts(db);
  const recentPosts = fetchedPosts.slice(-3).map((p) => ({
    title: p.title,
    description: p.description,
    content: p.content,
  }));

  return {
    props: {
      bestsellers,
      recentPosts,
    },
  };
}

export default Home;
