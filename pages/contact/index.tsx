import { FC } from 'react';

import ContactForm from 'components/molecules/ContactForm'
import ContactDetails from 'components/atoms/ContactDetails'
import Map from 'components/atoms/Map'
import styles from './contact.module.scss'

const Contact: FC = () => (
  <div className={styles.container}>
    <h2>Contact us</h2>
    <ContactForm />
    <ContactDetails big />
    <Map />
  </div>
);

export default Contact;
