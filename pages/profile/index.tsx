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
      ) : <h2>Log in to check your profile</h2>}
    </div>
  )
}

export default History
