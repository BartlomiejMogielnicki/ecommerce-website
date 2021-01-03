import { FC } from 'react'
import styles from './LoginContent.module.scss'

interface Props {
  type?: string
}

const LoginContent:FC<Props> = ({ type }) => (
  <div className={styles.container}>
    <div className={styles.titleContainer}>
      <h2>{type === 'login' ? 'Log' : 'Sign'}</h2>
      <h2>In</h2>
    </div>
    <div className={styles.formContainer}>
      Form
    </div>
  </div>
)

export default LoginContent
