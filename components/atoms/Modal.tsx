import { FC, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product } from '../../types';
import styles from './Modal.module.scss'

interface Props {
  product: Product,
  selectedImage: number,
  clicked: () => void
}

const Modal:FC<Props> = ({ product, selectedImage, clicked }) => {
  const enableScroll = ():void => {
    document.body.style.overflowY = 'scroll'
  }

  useEffect(() => {
    if (window.innerHeight > 600) {
      document.body.style.overflowY = 'hidden';
    }
    return () => enableScroll()
  }, [])
  return (
    <div className={styles.productImagesModalContainer}>
      <div className={styles.productImagesModal}>
        <Carousel className="carousel-style" showStatus={false} selectedItem={selectedImage}>
          {product.images.map((image) => (
            <div className={styles.activeImage} key={image.name}>
              <button className={styles.closeButton} type="button" onClick={clicked}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <img src={image.url} alt={image.name} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.productImagesModalBackdrop} onClick={clicked} />
    </div>
  )
}

export default Modal
