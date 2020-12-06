import { number, string } from 'prop-types'
import {FC} from 'react'
import styles from './ProductCard.module.scss'

type Props = {
  title: string,
  image: string,
  shortDescription: string,
  price: string,
}

const ProductCard:FC<Props> = ({title, image, shortDescription, price}) => {
  return (
    <div className={styles.container}>
      <img src={image} alt={title}/>
      <h2>{title}</h2>
      <p>{shortDescription}</p>
      <p>{price}</p>
      <div className={styles.btnsContainer}>
        <button>Details</button>
        <button>Add to cart</button>
      </div>
    </div>
  )
}

export default ProductCard