import { FC, useContext } from 'react'
import { UserContext } from 'context/UserContext'

import Header from 'components/organisms/Header'
import Footer from 'components/atoms/Footer'

const Cart:FC = () => {
  const { user: { cart } } = useContext(UserContext)
  console.log(cart)
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        {cart.length === 0 ? (
          <h2>Your cart is empty</h2>
        ) : (
          <h2>Cart</h2>
        )}
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.title}>
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
                <p>{item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Cart
