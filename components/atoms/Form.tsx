import { FC, useState } from 'react'
import styles from './Form.module.scss'

interface Props {
  type: string
}

const Form:FC<Props> = ({ type }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form className={`${styles.formContainer} ${type === 'login' && styles.small}`} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.inputSection}>
        <label htmlFor="username">
          Username
          <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      {type === 'signin' && (
      <div className={styles.inputSection}>
        <label htmlFor="email">
          E-mail
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      )}
      <div className={styles.inputSection}>
        <label htmlFor="password">
          Password
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      {type === 'signin' && (
      <div className={styles.inputSection}>
        <label htmlFor="password2">
          Confirm Password
          <input type="password" id="password2" onChange={(e) => setPassword2(e.target.value)} />
        </label>
      </div>
      )}
      <button className={styles.submitBtn} type="submit">Submit</button>
    </form>
  )
}

export default Form
