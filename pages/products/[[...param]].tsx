import { FC } from 'react';
import {useRouter} from 'next/router'

import Header from '../../components/organisms/Header'
import ProductsList from '../../components/organisms/ProductsList'

const Products: FC = () => {
const router = useRouter()
const paramsArr = router.query.param

let products = <ProductsList category={''}/>
if (paramsArr && paramsArr.length === 1) {
  products = <ProductsList category={paramsArr[0]}/>
} else if (paramsArr && paramsArr.length === 2) {
  products = <p>ProductPage</p>
}

  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        {products}
      </main>
      <footer></footer>
    </div>
  );
}

export default Products;