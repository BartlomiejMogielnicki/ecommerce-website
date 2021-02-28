import { FC, useState } from 'react'
import styles from './ContactForm.module.scss'

const ContactForm:FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [isNameError, setIsNameError] = useState(false)
  const [isEmailError, setIsEmailError] = useState(false)
  const [isMessageError, setIsMessageError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    let isValidate = true;

    if (!name) {
      setIsNameError(true)
      isValidate = false;
    } else {
      setIsNameError(false)
    }

    // E-mail input verification
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ((!email) || (!re.test(String(email).toLowerCase()))) {
      setIsEmailError(true)
      isValidate = false;
    } else {
      setIsEmailError(false)
    }

    if (!message) {
      setIsMessageError(true)
      isValidate = false;
    } else {
      setIsMessageError(false)
    }

    if (isValidate) {
      console.log('Submitted!')
    }
  }

  return (
    <form
      className={styles.contactForm}
      name="Gofakeshop contact form"
      onSubmit={handleSubmit}
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div className={styles.section}>
        <label className={styles.sectionLabel} htmlFor="name">
          Name
          <input
            className={`${styles.sectionInput} ${isNameError && styles.sectionInputError}`}
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name..."
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        {isNameError && <small className={styles.error}>Invalid name</small>}
      </div>
      <div className={styles.section}>
        <label className={styles.sectionLabel} htmlFor="email">
          E-mail
          <input
            className={`${styles.sectionInput} ${isEmailError && styles.sectionInputError}`}
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email address..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        {isEmailError && <small className={styles.error}>Invalid e-mail</small>}
      </div>
      <div className={styles.section}>
        <label className={styles.sectionLabel} htmlFor="text">
          Message
          <textarea
            className={`${styles.sectionTextarea} ${isMessageError && styles.sectionInputError}`}
            name="text"
            id="text"
            placeholder="Enter your message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </label>
        {isMessageError && <small className={styles.error}>Invalid message</small>}
      </div>
      <button className={styles.submitBtn} type="submit">Submit</button>
    </form>
  )
}

export default ContactForm
