import {FC} from 'react'
import styles from './Products.module.scss'
import products from '../../data/products.json'

import ProductCard from '../atoms/ProductCard'

const Products: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.categoriesContainer}>
        Categories
      </div>
      <div className={styles.productsContainer}>
        {products.map(product => {
          return (
            <ProductCard 
              key={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              shortDescription={product.shortDescription}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Products