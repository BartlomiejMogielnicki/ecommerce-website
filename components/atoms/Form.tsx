import { FC, useContext, useState } from 'react'
import { UserContext } from 'context/UserContext'
import styles from './Form.module.scss'

const SIGNIN = 'signin';
const LOGIN = 'login'

interface Props {
  type: string
}

const Form:FC<Props> = ({ type }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [isUsernameError, toggleUsernameError] = useState(false)
  const [isEmailError, toggleEmailError] = useState(false)
  const [isPasswordError, togglePasswordError] = useState(false)
  const [isPassword2Error, togglePassword2Error] = useState(false)

  const { login, signin } = useContext(UserContext)

  const passwordErrorMessage = type === SIGNIN ? 'Password min. length is 6 characters' : 'Invalid password'

  const handleSubmit = (e) => {
    e.preventDefault()

    if (username.length === 0) {
      toggleUsernameError(true)
      return
    }
    toggleUsernameError(false)

    const validateEmail = (address) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(address).toLowerCase());
    }

    if ((type === SIGNIN) && ((email.length === 0) || (!validateEmail(email)))) {
      toggleEmailError(true)
      return
    }
    toggleEmailError(false)

    if ((password.length === 0) || (password.length < 6)) {
      togglePasswordError(true)
      return
    }
    togglePasswordError(false)

    if ((type === SIGNIN) && ((password2.length === 0 || password !== password2))) {
      togglePassword2Error(true)
      return
    }
    togglePassword2Error(false)

    if (type === LOGIN) {
      login(username, password)
    }

    if (type === SIGNIN) {
      signin(username, email, password)
    }

    setUsername('')
    setEmail('')
    setPassword('')
    setPassword2('')
  }

  return (
    <form className={`${styles.formContainer} ${type === LOGIN && styles.small}`} noValidate onSubmit={(e) => handleSubmit(e)}>
      <div className={`${styles.inputSection} ${isUsernameError && styles.isError}`}>
        <label htmlFor="username">
          Username
          <input className={`${isUsernameError && styles.isError}`} type="text" maxLength={12} id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        {isUsernameError && <small className={styles.errorMessage}>Invalid username</small>}
      </div>
      {type === 'signin' && (
      <div className={styles.inputSection}>
        <label htmlFor="email">
          E-mail
          <input className={`${isEmailError && styles.isError}`} type="email" maxLength={35} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {isEmailError && <small className={styles.errorMessage}>Invalid e-mail address</small>}
      </div>
      )}
      <div className={styles.inputSection}>
        <label htmlFor="password">
          Password
          <input className={`${isPasswordError && styles.isError}`} type="password" maxLength={15} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {isPasswordError && <small className={styles.errorMessage}>{passwordErrorMessage}</small>}
      </div>
      {type === 'signin' && (
      <div className={styles.inputSection}>
        <label htmlFor="password2">
          Confirm Password
          <input className={`${isPassword2Error && styles.isError}`} type="password" maxLength={15} id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} />
        </label>
        {isPassword2Error && <small className={styles.errorMessage}>Invalid password</small>}
      </div>
      )}
      <button className={styles.submitBtn} type="submit">Submit</button>
    </form>
  )
}

export default Form
