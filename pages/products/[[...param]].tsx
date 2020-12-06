import { FC } from 'react';

import Header from '../../components/organisms/Header'
import ProductsList from '../../components/organisms/Products'

const Products: FC = () => {
  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        <ProductsList/>
      </main>
      <footer></footer>
    </div>
  );
}

export default Products;