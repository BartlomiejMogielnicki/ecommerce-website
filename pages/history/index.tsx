import { FC, useContext } from 'react'
import { UserContext } from 'context/UserContext'
import UserNav from 'components/atoms/UserNav'

import styles from './history.module.scss'

const History:FC = () => {
  const { user: { history, authenticated } } = useContext(UserContext)

  return (
    <div className={styles.container}>
      <UserNav />
      {!authenticated && <h2>Log in to check your history</h2>}
    </div>
  )
}

export default History
