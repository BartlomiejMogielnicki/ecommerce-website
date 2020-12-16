import { FC } from 'react';
import { useRouter } from 'next/router';

import { Product } from 'types';
import { getProducts } from 'db/products';
import { connectToDB } from 'db/connect';

import Header from 'components/organisms/Header';
import ProductsList from 'components/organisms/ProductsList/ProductsList';
import ProductDetails from 'components/molecules/ProductDetails';
import Footer from 'components/atoms/Footer'

interface Props {
  products: Product[]
}

const Products: FC<Props> = ({ products }) => {
  const router = useRouter();
  const paramsArr = router.query.param;

  let productsEl = <ProductsList products={products} />;
  if (paramsArr && paramsArr.length === 1) {
    const filteredProducts = products.filter((p) => (
      p.category.split(' ').join('-').toLowerCase() === paramsArr[0]
    ));
    productsEl = <ProductsList products={filteredProducts} />;
  } else if (paramsArr && paramsArr.length === 2) {
    const singleProduct = products.find((p) => (
      p.title.split(' ').join('-').toLowerCase() === paramsArr[1]
    ));
    productsEl = <ProductDetails product={singleProduct} />;
  }

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        {productsEl}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export async function getStaticPaths() {
  const { db } = await connectToDB();
  const fetchedProducts = await getProducts(db);

  return {
    paths: fetchedProducts.map((p) => ({
      params: { param: [p.category, p.title.split(' ').join('-').toLowerCase()] },
    })),
    fallback: true,
  };
}

export async function getStaticProps() {
  const { db } = await connectToDB();
  const fetchedProducts = await getProducts(db);
  const products = fetchedProducts.map((p) => ({
    title: p.title,
    category: p.category,
    shortDescription: p.shortDescription,
    description: p.description,
    price: p.price,
    quantity: p.quantity,
  }));

  return {
    props: {
      products,
    },
  };
}

export default Products;
