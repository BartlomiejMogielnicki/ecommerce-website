import { FC, useState, useContext } from 'react';
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'components/atoms/Modal'
import { UserContext } from 'context/UserContext'
import styles from './ProductDetails.module.scss';
import { Product } from '../../types';

interface Props {
  product: Product
}

const ProductDetails:FC<Props> = ({ product }) => {
  const [isShowProductModal, toggleShowProductModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const { user: { cart }, addToCart } = useContext(UserContext)

  const handleShowHideModal = (imageIndex) => {
    setSelectedImage(imageIndex)
    toggleShowProductModal(!isShowProductModal)
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Carousel className="carousel-style" showStatus={false} showArrows={false}>
          {product.images.map((image, index) => (
            <div key={image.name} className={styles.activeImage} onClick={() => handleShowHideModal(index)}>
              <img src={image.url} alt={image.name} />
            </div>
          ))}
        </Carousel>
        <button className={styles.zoomButton} type="button" onClick={() => handleShowHideModal(selectedImage)}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className={styles.panel}>
        <h1>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>
          {product.price}
          {' $'}
        </p>
        <div className={styles.btnsContainer}>
          <button type="button">
            <Link href={`/products/${product.category}`}>
              <a>{`Return to ${product.category}`}</a>
            </Link>
          </button>
          {cart.some((item) => item.title === product.title) ? (
            <button type="button" disabled>
              <p>In cart</p>
            </button>
          ) : (
            <button type="button" onClick={() => addToCart(product.title, product.category, product.price, product.images[0].url)}>
              <p>Add to cart</p>
            </button>
          )}
        </div>
      </div>
      {isShowProductModal
        && <Modal selectedImage={selectedImage} product={product} clicked={() => handleShowHideModal(selectedImage)} />}
    </div>
  );
}

export default ProductDetails;
