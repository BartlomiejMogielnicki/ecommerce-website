import { FC, useState } from 'react';
import Categories from 'components/organisms/ProductsList/Categories/Categories';
import ProductCard from './ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

import { Product } from '../../../types';

interface Props {
  products: Product[]
}

const ProductsList: FC<Props> = ({ products }) => {
  const [sortOption, setSortOption] = useState('bestsellers')

  let sortFn;
  switch (sortOption) {
    case 'nameAtoZ':
      sortFn = products.sort((a, b) => a.title.localeCompare(b.title))
      break;
    case 'nameZtoA':
      sortFn = products.sort((a, b) => b.title.localeCompare(a.title))
      break;
    case 'priceAscending':
      sortFn = products.sort((a, b) => a.price - b.price)
      break;
    case 'priceDescending':
      sortFn = products.sort((a, b) => b.price - a.price)
      break;
    default:
      sortFn = products.sort((product) => (product.bestseller ? -1 : 1));
  }

  return (
    <div className={styles.container}>
      <div className={styles.categoriesContainer}>
        <Categories />
        <div className={styles.sortContainer}>
          <label htmlFor="sort">
            <h3>Sort</h3>
            <select name="sort" id="sort" onChange={(e) => setSortOption(e.target.value)}>
              <option value="bestsellers" selected>Bestsellers</option>
              <option value="nameAtoZ">Name A to Z</option>
              <option value="nameZtoA">Name Z to A</option>
              <option value="priceAscending">Price ascending</option>
              <option value="priceDescending">Price descending</option>
            </select>
          </label>
        </div>
      </div>
      <div className={styles.productsContainer}>
        {products && sortFn.map((product) => (
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
}

export default ProductsList;
