import { FC, useEffect } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import styles from './PurchaseModal.module.scss'

interface Props {
  clicked: () => void,
  permission: boolean
}

const PurchaseModal:FC<Props> = ({ clicked, permission }) => {
  const enableScroll = ():void => {
    document.body.style.overflowY = 'scroll'
  }

  useEffect(() => {
    if (window.innerHeight > 600) {
      document.body.style.overflowY = 'hidden';
    }
    return () => enableScroll()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.purchaseInfo}>
        {permission ? <h3>Thank you for purchase!</h3> : (
          <>
            <h3>Please fill in the user profile</h3>
            <p>Create an account and log in to save your user data for next purchases and keep track of your purchase history!</p>
            <button className={styles.navButton} type="button" onClick={clicked}>
              <Link href="/profile">
                <a>User Profile</a>
              </Link>
            </button>
          </>
        )}
        <button className={styles.closeButton} type="button" onClick={clicked}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className={styles.purchaseModalBackdrop} onClick={clicked} />
    </div>
  )
}

export default PurchaseModal
