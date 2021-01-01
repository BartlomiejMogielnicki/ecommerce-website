import { FC, useState } from 'react';
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ProductDetails.module.scss';
import { Product } from '../../types';

interface Props {
  product: Product
}

const ProductDetails:FC<Props> = ({ product }) => {
  const [isShowProductModal, toggleShowProductModal] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Carousel className="carousel-style" showStatus={false} showArrows={false}>
          {product.images.map((image) => (
            <div className={styles.activeImage}>
              <img src={image.url} alt={image.name} />
            </div>
          ))}
        </Carousel>
        <button className={styles.zoomButton} type="button" onClick={() => toggleShowProductModal(!isShowProductModal)}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
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
      {isShowProductModal && (
        <div className={styles.productImagesModalContainer}>
          <div className={styles.productImagesModal}>
            <Carousel className="carousel-style" showStatus={false}>
              {product.images.map((image) => (
                <div className={styles.activeImage}>
                  <img src={image.url} alt={image.name} />
                </div>
              ))}
            </Carousel>
          </div>
          <div className={styles.productImagesModalBackdrop} onClick={() => toggleShowProductModal(!isShowProductModal)} />
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
