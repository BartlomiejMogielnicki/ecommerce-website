import { FC } from 'react'
import ContactDetails from 'components/atoms/ContactDetails'
import styles from './ContactContent.module.scss'

const ContactContent:FC = () => (
  <div className={styles.container}>
    <h2>Contact us</h2>
    <ContactDetails big />
  </div>
)

export default ContactContent
