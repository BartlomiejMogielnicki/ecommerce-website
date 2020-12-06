import { FC } from 'react';
import {useRouter} from 'next/router'

import Header from '../../components/organisms/Header'
import ProductsList from '../../components/organisms/ProductsList'

const Products: FC = () => {
  const router = useRouter()
  let categoryName = '';
  if(router.query.param) {
    categoryName = router.query.param[0]
  } 

  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        <ProductsList category={categoryName}/>
      </main>
      <footer></footer>
    </div>
  );
}

export default Products;