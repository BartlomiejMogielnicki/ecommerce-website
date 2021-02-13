import { FC, useContext } from 'react'
import { UserContext } from 'context/UserContext'
import UserNav from 'components/atoms/UserNav'
import UserProfileForm from 'components/atoms/UserProfileForm'

import styles from './profile.module.scss'

const History:FC = () => {
  const { user: { authenticated } } = useContext(UserContext)

  return (
    <div className={styles.container}>
      <UserNav />
      {authenticated ? (
        <>
          <h2>User profile</h2>
          <UserProfileForm />
        </>
      ) : (
        <>
          <h2>Guest user profile</h2>
          <p className={styles.advice}>Create an account and log in to save your user data for next purchases and keep track of your purchase history</p>
          <UserProfileForm />
        </>
      )}
    </div>
  )
}

export default History
