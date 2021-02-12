import {
  FC, useContext, useState, useEffect,
} from 'react'
import { UserContext } from 'context/UserContext'
import styles from './UserProfileForm.module.scss'

const UserProfileForm:FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [voivodeship, setVoivodeship] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [street, setStreet] = useState('')
  const [building, setBuilding] = useState('')

  const [isEmailError, toggleEmailError] = useState(false)

  const { user: { userData }, updateProfile } = useContext(UserContext)

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName)
      setLastName(userData.lastName)
      setEmail(userData.email)
      setPhone(userData.phone)
      setCountry(userData.country)
      setVoivodeship(userData.voivodeship)
      setCity(userData.city)
      setZipCode(userData.zipCode)
      setStreet(userData.street)
      setBuilding(userData.building)
    }
  }, [userData])

  const handleSubmit = (e) => {
    e.preventDefault()

    const validateEmail = (address) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(address).toLowerCase());
    }

    if (!validateEmail(email)) {
      toggleEmailError(true)
      return
    }
    toggleEmailError(false)

    const userProfile = {
      firstName,
      lastName,
      email,
      phone,
      country,
      voivodeship,
      city,
      zipCode,
      street,
      building,
    }

    updateProfile(userProfile)
  }

  return (
    <form className={styles.formContainer} noValidate onSubmit={(e) => handleSubmit(e)}>
      <h5>Name</h5>
      <div className={styles.formSection}>
        <div className={styles.inputSection}>
          <label htmlFor="firstName">
            First Name
            <input type="text" maxLength={15} id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="lastName">
            Last Name
            <input type="text" maxLength={15} id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
        </div>
      </div>
      <h5>Contact</h5>
      <div className={styles.formSection}>
        <div className={styles.inputSection}>
          <label htmlFor="email">
            E-mail
            <input className={`${isEmailError && styles.isError}`} type="email" maxLength={35} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          {isEmailError && <small className={styles.errorMessage}>Invalid e-mail address</small>}
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="phone">
            Phone number
            <input type="tel" id="phone" maxLength={15} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
        </div>
      </div>
      <h5>Address</h5>
      <div className={styles.formSection}>
        <div className={styles.inputSection}>
          <label htmlFor="country">
            Country
            <input type="text" maxLength={20} id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </label>
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="voivodeship">
            Voivodeship/State
            <input type="text" maxLength={35} id="voivodeship" value={voivodeship} onChange={(e) => setVoivodeship(e.target.value)} />
          </label>
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="city">
            City
            <input type="text" maxLength={35} id="city" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="zip">
            Zip code
            <input type="number" maxLength={35} id="zip" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={styles.zipInput} />
          </label>
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="street">
            Street
            <input type="text" maxLength={20} id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
          </label>
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="building">
            Building/Apartment
            <input type="text" maxLength={10} id="building" value={building} onChange={(e) => setBuilding(e.target.value)} />
          </label>
        </div>
      </div>
      <button className={styles.submitBtn} type="submit">Update</button>
    </form>
  )
}

export default UserProfileForm
