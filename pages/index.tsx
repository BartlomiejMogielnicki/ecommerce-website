import Head from 'next/head';
import { FC, useEffect, useContext } from 'react';
import { Product, Post } from 'types';
import { getProducts } from 'db/products';
import { getPosts } from 'db/posts';
import { connectToDB } from 'db/connect';
import { UserContext } from 'context/UserContext'

import HomeContent from 'components/organisms/HomeContent/HomeContent'

interface Props {
  bestsellers: Product[],
  recentPosts: Post[],
  cookie?: string
}

const Home: FC<Props> = ({ bestsellers, recentPosts, cookie }) => {
  const { user, cookieLogin } = useContext(UserContext)

  useEffect(() => {
    if (!user.authenticated && cookie) {
      cookieLogin()
    }
  }, [cookie, cookieLogin])

  return (
    <>
      <Head>
        <title>GoFakeShop action cameras shop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Action cameras shop website. Buy the best action cameras. Read articles about the best action cameras. Contact for advice about best action cameras." />
        <meta name="keywords" content="gopro, action cameras, cameras, hero, video, photo, media" />
      </Head>
      <HomeContent bestsellers={bestsellers} recentPosts={recentPosts} />
    </>
  )
}

export async function getServerSideProps(context) {
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

  const { cookie } = context.req.headers

  return {
    props: {
      bestsellers,
      recentPosts,
      cookie: cookie || null,
    },
  };
}

export default Home;
