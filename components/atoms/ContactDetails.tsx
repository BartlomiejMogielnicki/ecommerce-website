import { FC } from 'react'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ContactDetails.module.scss'

interface Props {
  big?: boolean
}

const ContactDetails:FC<Props> = ({ big }) => (
  <div className={`${styles.contactContainer} ${big ? styles.big : null}`}>
    <div className={`${styles.contactInfo} ${big ? styles.big : null}`}>
      <div>
        <a><FontAwesomeIcon icon={faPhone} /></a>
        111-222-333
      </div>
      <div>
        <a><FontAwesomeIcon icon={faEnvelope} /></a>
        gofakeshop@fakemail.pl
      </div>
    </div>
    <div className={`${styles.socialContainer} ${big ? styles.big : null}`}>
      <a>
        <FontAwesomeIcon icon={faFacebookSquare} />
      </a>
      <a>
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a>
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </div>
  </div>
)

export default ContactDetails
