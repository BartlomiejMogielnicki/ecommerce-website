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
      {products && products.map((product) => (
        <ProductCard
          key={product.title}
          title={product.title}
          category={product.category}
          image={product.image}
          price={product.price}
          shortDescription={product.shortDescription}
        />
      ))}
    </div>
  </div>
);

export default ProductsList;