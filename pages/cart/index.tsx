import { FC, useContext } from 'react'
import { UserContext } from 'context/UserContext'

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from 'components/organisms/Header'
import Footer from 'components/atoms/Footer'
import styles from './cart.module.scss'

const Cart:FC = () => {
  const { user: { cart } } = useContext(UserContext)

  const summaryCost = cart.map((item) => item.price).reduce((a, b) => a + b, 0)

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
              <div className={styles.cartItemQuantity}>
                <button type="button">-</button>
                <p>
                  {item.quantity}
                  {' pcs'}
                </p>
                <button type="button">+</button>
              </div>
              <p>
                {item.price}
                {' $'}
              </p>
              <button type="button" className={styles.buttonDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.summaryCost}>
          <p>
            Summary cost:
            <strong>{summaryCost}</strong>
            $
          </p>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Cart
