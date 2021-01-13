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
      <div className={styles.sortContainer}>
        <label htmlFor="sort">
          <h3>Sort</h3>
          <select name="sort" id="sort">
            <option value="bestsellers">Bestsellers</option>
            <option value="nameAtoZ">Name A to Z</option>
            <option value="nameZtoA">Name Z to A</option>
            <option value="priceAscending">Price ascending</option>
            <option value="priceDescending">Price descending</option>
          </select>
        </label>
      </div>
    </div>
    <div className={styles.productsContainer}>
      {products && products.sort((product) => (product.bestseller ? -1 : 1)).map((product) => (
        <ProductCard
          key={product.title}
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
