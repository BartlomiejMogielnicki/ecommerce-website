import { FC } from 'react'
import Form from 'components/atoms/Form'
import styles from './LoginContent.module.scss'

interface Props {
  type: string
}

const LoginContent:FC<Props> = ({ type }) => (
  <div className={styles.container}>
    <div className={styles.titleContainer}>
      <h2>{type === 'login' ? 'Log' : 'Sign'}</h2>
      <h2>{type === 'login' ? 'in' : 'up'}</h2>
    </div>
    <div className={styles.formContainer}>
      <Form type={type} />
    </div>
  </div>
)

export default LoginContent
