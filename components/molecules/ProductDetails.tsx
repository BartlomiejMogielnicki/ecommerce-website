import { FC } from 'react';
import styles from './ProductDetails.module.scss';
import { Product } from '../../types';

interface Props {
  product: Product
}

const ProductDetails:FC<Props> = ({ product }) => (
  <div className={styles.container}>
    <div className={styles.imageContainer}>
      <img src={product.image} alt={product.title} />
    </div>
    <div className={styles.panel}>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button type="button">Add to cart</button>
    </div>
  </div>
);

export default ProductDetails;
