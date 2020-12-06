import { FC } from 'react';
import {useRouter} from 'next/router'

import Header from '../../components/organisms/Header'
import ProductsList from '../../components/organisms/ProductsList'

const Products: FC = () => {
  const router = useRouter()
  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        <ProductsList category={router.query.param[0]}/>
      </main>
      <footer></footer>
    </div>
  );
}

export default Products;