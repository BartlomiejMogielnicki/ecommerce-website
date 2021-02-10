import { FC, useEffect } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PurchaseModal.module.scss'

interface Props {
  clicked: () => void
}

const PurchaseModal:FC<Props> = ({ clicked }) => {
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
        <h2>Thank you for purchase!</h2>
        <button className={styles.closeButton} type="button" onClick={clicked}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className={styles.purchaseModalBackdrop} onClick={clicked} />
    </div>
  )
}

export default PurchaseModal
