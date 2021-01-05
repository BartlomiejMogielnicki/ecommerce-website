import { FC } from 'react'
import styles from './Form.module.scss'

interface Props {
  type: string
}

const Form:FC<Props> = ({ type }) => (
  <form className={`${styles.formContainer} ${type === 'login' && styles.small}`}>
    <div className={styles.inputSection}>
      <label htmlFor="username">
        Username
        <input type="text" id="username" />
      </label>
    </div>
    {type === 'signin' && (
    <div className={styles.inputSection}>
      <label htmlFor="email">
        E-mail
        <input type="email" id="email" />
      </label>
    </div>
    )}
    <div className={styles.inputSection}>
      <label htmlFor="password">
        Password
        <input type="password" id="password" />
      </label>
    </div>
    {type === 'signin' && (
    <div className={styles.inputSection}>
      <label htmlFor="password2">
        Confirm Password
        <input type="password" id="password2" />
      </label>
    </div>
    )}
    <button className={styles.submitBtn} type="submit">Submit</button>
  </form>
)

export default Form
