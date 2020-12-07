import {FC} from 'react'
import styles from './ProductsList.module.scss'

import { Product } from '../../types'

import Categories from '../atoms/Categories'
import ProductCard from '../atoms/ProductCard'

interface Props {
  products: Product[]
}

const ProductsList: FC<Props> = ({products}) => {
  return (
    <div className={styles.container}>
      <div className={styles.categoriesContainer}>
        <Categories/>
      </div>
      <div className={styles.productsContainer}>
        {products && products.map(product => {
          return (
            <ProductCard 
              key={product.title}
              title={product.title}
              category={product.category}
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

export default ProductsList