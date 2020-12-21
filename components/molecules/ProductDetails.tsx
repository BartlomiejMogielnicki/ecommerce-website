import { FC } from 'react';
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styles from './ProductDetails.module.scss';
import { Product } from '../../types';

interface Props {
  product: Product
}

const ProductDetails:FC<Props> = ({ product }) => (
  <div className={styles.container}>
    {/* <div className={styles.imageContainer}>
      <img src={product.images[0].url} alt={product.title} />
    </div> */}
    <div className={styles.imageContainer}>
      <Carousel>
        {product.images.map((image) => (
          <div className={styles.activeImage}>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </Carousel>
    </div>
    <div className={styles.panel}>
      <h1>{product.title}</h1>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>{product.price}</p>
      <div className={styles.btnsContainer}>
        <button type="button">
          <Link href={`/products/${product.category}`}>
            <a>{`Return to ${product.category}`}</a>
          </Link>
        </button>
        <button type="button">
          <p>Add to cart</p>
        </button>
      </div>
    </div>
  </div>
);

export default ProductDetails;
