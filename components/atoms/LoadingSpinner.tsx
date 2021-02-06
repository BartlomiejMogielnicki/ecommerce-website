import { FC } from 'react'
import styles from './LoadingSpinner.module.scss'

const LoadingSpinner: FC = () => (
  <div className={styles.container}>
    <div className={styles.firstDot} />
    <div className={styles.secondDot} />
    <div className={styles.thirdDot} />
    <div className={styles.fourthDot} />
  </div>
)

export default LoadingSpinner
