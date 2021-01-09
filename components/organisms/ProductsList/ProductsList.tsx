import { FC } from 'react';
import Categories from 'components/organisms/ProductsList/Categories/Categories';
import ProductCard from './ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

import { Product } from '../../../types';

interface Props {
  products: Product[]
}

const ProductsList: FC<Props> = ({ products }) => (
  <div className={styles.container}>
    <div className={styles.categoriesContainer}>
      <Categories />
    </div>
    <div className={styles.productsContainer}>
      {products && products.sort((product) => (product.bestseller ? -1 : 1)).map((product) => (
        <ProductCard
          key={product.title}
          _id={product._id}
          title={product.title}
          category={product.category}
          image={product.images[0].url}
          price={product.price}
          bestseller={product.bestseller}
          shortDescription={product.shortDescription}
        />
      ))}
    </div>
  </div>
);

export default ProductsList;
