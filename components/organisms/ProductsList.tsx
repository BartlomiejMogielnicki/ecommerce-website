import {FC} from 'react'
import styles from './ProductsList.module.scss'

import Categories from '../atoms/Categories'
import ProductCard from '../atoms/ProductCard'

import products from '../../data/products.json'

type Props = {
  category: string
}

const ProductsList: FC<Props> = ({category}) => {
  let filteredProducts;
  if (category !== '') {
    filteredProducts = products.filter((p) => {
      return (
        p.category === category
      )
    })
  } else {
    filteredProducts = products
  }
  return (
    <div className={styles.container}>
      <div className={styles.categoriesContainer}>
        <Categories/>
      </div>
      <div className={styles.productsContainer}>
        {filteredProducts.map(product => {
          return (
            <ProductCard 
              key={product.id}
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