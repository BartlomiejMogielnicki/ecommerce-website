import { FC, useContext } from 'react'
import { UserContext } from 'context/UserContext'

import Header from 'components/organisms/Header'
import Footer from 'components/atoms/Footer'
import styles from './cart.module.scss'

const Cart:FC = () => {
  const { user: { cart } } = useContext(UserContext)
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className={styles.container}>
        {cart.length === 0 ? (
          <h2>Your cart is empty</h2>
        ) : (
          <h2>Cart</h2>
        )}
        <ul className={styles.cartList}>
          {cart.map((item) => (
            <li className={styles.cartItem} key={item.title}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
              <p>
                {item.quantity}
                pcs
              </p>
              <p>
                {item.price}
                $
              </p>
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Cart
