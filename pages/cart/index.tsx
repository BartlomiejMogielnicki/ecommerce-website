import { FC, useContext } from 'react'
import { UserContext } from 'context/UserContext'
import Link from 'next/link'

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from 'components/organisms/Header'
import Footer from 'components/atoms/Footer'
import styles from './cart.module.scss'

const Cart:FC = () => {
  const {
    user: { cart, authToken }, deleteFromCart, changeQuantity,
  } = useContext(UserContext)

  const summaryCost = cart.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0).toFixed(2)

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
              <div className={styles.cartItemTitle}>
                <p>{item.title}</p>
                <button type="button">
                  <Link href={`/products/${item.category}/${item.title.split(' ').join('-').toLowerCase()}`}>
                    <a>Details</a>
                  </Link>
                </button>
              </div>
              <div className={styles.cartItemQuantity}>
                <button type="button" disabled={item.quantity === 0} onClick={() => changeQuantity(authToken, item.title, 'dec')}>-</button>
                <p>
                  {item.quantity}
                  {' pcs'}
                </p>
                <button type="button" onClick={() => changeQuantity(authToken, item.title, 'inc')}>+</button>
              </div>
              <p>
                {(item.price * item.quantity).toFixed(2)}
                {' $'}
              </p>
              <button type="button" className={styles.buttonDelete} onClick={() => deleteFromCart(authToken, item.title)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.summaryCost}>
          <p>
            Summary cost:
            <strong>{summaryCost}</strong>
            {' $'}
          </p>
        </div>
        <div className={styles.buy}>
          <button className={styles.buyButton} type="button">Buy</button>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Cart
