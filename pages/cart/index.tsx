import { FC, useContext, useState } from 'react'
import { UserContext } from 'context/UserContext'
import Link from 'next/link'
import PurchaseModal from 'components/atoms/PurchaseModal'
import UserNav from 'components/atoms/UserNav'
import LoadingSpinner from 'components/atoms/LoadingSpinner'

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './cart.module.scss'

const Cart:FC = () => {
  const [isUserProfileFormComplete, setIsUserProfileFormComplete] = useState(false)
  const [isPurchaseModalShown, setIsPurchaseModalShow] = useState(false)
  const {
    user: { cart, userData, loading }, deleteFromCart, changeQuantity, purchase,
  } = useContext(UserContext)

  const summaryCost = cart.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0).toFixed(2)

  const handlePurchase = () => {
    const userDataValues = Object.values(userData)
    if (userDataValues.every((item) => item !== '')) {
      setIsUserProfileFormComplete(true)
      purchase(cart, userData)
    }
    setIsPurchaseModalShow(true)
  }

  return (
    <div className={styles.container}>
      <UserNav />
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
              <button type="button" disabled={item.quantity === 0} onClick={() => changeQuantity(item.title, 'dec')}>-</button>
              <p>
                {item.quantity}
                {' pcs'}
              </p>
              <button type="button" onClick={() => changeQuantity(item.title, 'inc')}>+</button>
            </div>
            <p className={styles.cartItemPrice}>
              {(item.price * item.quantity).toFixed(2)}
              {' $'}
            </p>
            <button type="button" className={styles.buttonDelete} onClick={() => deleteFromCart(item.title)}>
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
        <button className={styles.buyButton} type="button" onClick={handlePurchase} disabled={cart.length === 0}>Buy</button>
      </div>
      {loading === 'LOADING_CART' ? (
        <div className={styles.loadingSpinner}>
          <LoadingSpinner />
        </div>
      )
        : null}
      {isPurchaseModalShown && !loading && <PurchaseModal permission={isUserProfileFormComplete} clicked={() => setIsPurchaseModalShow(false)} />}
    </div>
  )
}

export default Cart
