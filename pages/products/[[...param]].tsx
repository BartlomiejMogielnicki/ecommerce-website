import { FC } from 'react';
import {useRouter} from 'next/router'

import fetchedProducts from '../../data/products.json'
import { Product } from '../../types'

import Header from '../../components/organisms/Header'
import ProductsList from '../../components/organisms/ProductsList'

interface Props {
  products: Product[]
}

const Products: FC<Props> = ({products}) => {
const router = useRouter()
const paramsArr = router.query.param

let productsEl = <ProductsList products={products}/>
if (paramsArr && paramsArr.length === 1) {
  const filteredProducts = products.filter(p => (
    p.category.split(' ').join('-').toLowerCase() === paramsArr[0]
  ))
  productsEl = <ProductsList products={filteredProducts}/>
} else if (paramsArr && paramsArr.length === 2) {
  productsEl = <p>ProductPage</p>
}

  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        {productsEl}
      </main>
      <footer></footer>
    </div>
  );
}

export function getStaticPaths() {
  return {
    paths: fetchedProducts.map((p) => ({
      params: { param: [p.category, p.title.split(' ').join('-').toLowerCase()] }
    })),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  return {
    props: {
      products: fetchedProducts,
    }
  }
}

export default Products;