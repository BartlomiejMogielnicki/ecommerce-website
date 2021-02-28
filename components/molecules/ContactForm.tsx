import { FC, useState } from 'react'
import styles from './ContactForm.module.scss'

const ContactForm:FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted!')
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
            className={styles.sectionInput}
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name..."
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <small className={styles.error}>Invalid name</small>
      </div>
      <div className={styles.section}>
        <label className={styles.sectionLabel} htmlFor="email">
          E-mail
          <input
            className={styles.sectionInput}
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email address..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <small className={styles.error}>Invalid e-mail</small>
      </div>
      <div className={styles.section}>
        <label className={styles.sectionLabel} htmlFor="text">
          Message
          <textarea
            className={styles.sectionTextarea}
            name="text"
            id="text"
            placeholder="Enter your message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </label>
        <small className={styles.error}>Invalid message</small>
      </div>
      <button className={styles.submitBtn} type="submit">Submit</button>
    </form>
  )
}

export default ContactForm
