import { FC } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { Product } from '../../types';
import styles from './Modal.module.scss'

interface Props {
  product: Product,
  clicked: () => void
}

const Modal:FC<Props> = ({ product, clicked }) => (
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
    <div className={styles.productImagesModalBackdrop} onClick={clicked} />
  </div>
)

export default Modal
