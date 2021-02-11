import { FC, useContext } from 'react'
import { UserContext } from 'context/UserContext'
import UserNav from 'components/atoms/UserNav'

import styles from './history.module.scss'

const History:FC = () => {
  const { user: { history, authenticated } } = useContext(UserContext)

  return (
    <div className={styles.container}>
      <UserNav />
      {authenticated ? (
        <>
          <h2>Recent orders</h2>
          <ul className={styles.historyList}>
            {history.map((order) => (
              <li key={order.orderDate} className={styles.historyItem}>
                <h4 className={styles.historyItemDate}>{order.orderDate}</h4>
                <p>
                  {'Status: '}
                  <span className={(order.orderStatus === 'Finished' && styles.finished) || (order.orderStatus === 'Canceled' && styles.canceled)}>{order.orderStatus}</span>
                </p>
                <ul className={styles.historyOrderList}>
                  {order.cart.map((item) => (
                    <li key={item.title} className={styles.historyOrderItem}>
                      <p>
                        {item.title}
                      </p>
                      <p className={styles.historyOrderItemQuantity}>
                        {item.quantity}
                        {' pcs'}
                      </p>
                      <p className={styles.historyOrderItemPrice}>
                        {item.price * item.quantity}
                        {' $'}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      ) : <h2>Log in to check your history</h2>}
    </div>
  )
}

export default History
