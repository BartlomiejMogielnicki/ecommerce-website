import {
  FC, useContext, useState, useEffect,
} from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from 'context/UserContext'
import LoadingSpinner from 'components/atoms/LoadingSpinner'
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

  const [isFirstNameError, toggleFirstNameError] = useState(false)
  const [isLastNameError, toggleLastNameError] = useState(false)
  const [isEmailError, toggleEmailError] = useState(false)
  const [isPhoneError, togglePhoneError] = useState(false)
  const [isCountryError, toggleCountryError] = useState(false)
  const [isVoivodeshipError, toggleVoivodeshipError] = useState(false)
  const [isCityError, toggleCityError] = useState(false)
  const [isZipCodeError, toggleZipCodeError] = useState(false)
  const [isStreetError, toggleStreetError] = useState(false)
  const [isBuildingError, toggleBuildingError] = useState(false)

  const [isGuestProfileUpdated, setIsGuestProfileUpdated] = useState(false)

  const { user: { authenticated, userData, loading }, updateProfile, updateGuestProfile } = useContext(UserContext)

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
    } else {
      toggleEmailError(false)
    }

    if (firstName.length === 0) {
      toggleFirstNameError(true)
    } else {
      toggleFirstNameError(false)
    }

    if (lastName.length === 0) {
      toggleLastNameError(true)
    } else {
      toggleLastNameError(false)
    }

    if (phone.length === 0) {
      togglePhoneError(true)
    } else {
      togglePhoneError(false)
    }

    if (country.length === 0) {
      toggleCountryError(true)
    } else {
      toggleCountryError(false)
    }

    if (voivodeship.length === 0) {
      toggleVoivodeshipError(true)
    } else {
      toggleVoivodeshipError(false)
    }

    if (city.length === 0) {
      toggleCityError(true)
    } else {
      toggleCityError(false)
    }

    if (zipCode.length === 0) {
      toggleZipCodeError(true)
    } else {
      toggleZipCodeError(false)
    }

    if (street.length === 0) {
      toggleStreetError(true)
    } else {
      toggleStreetError(false)
    }

    if (building.length === 0) {
      toggleBuildingError(true)
    } else {
      toggleBuildingError(false)
    }

    if (!validateEmail(email) || firstName.length === 0 || lastName.length === 0 || phone.length === 0 || country.length === 0 || voivodeship.length === 0 || city.length === 0 || zipCode.length === 0 || street.length === 0 || building.length === 0) {
      return
    }

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

    if (authenticated) {
      updateProfile(userProfile)
      setIsGuestProfileUpdated(true)
    } else {
      updateGuestProfile(userProfile)
      setIsGuestProfileUpdated(true)
    }
  }

  return (
    <form className={styles.formContainer} noValidate onSubmit={(e) => handleSubmit(e)}>
      <h5>Name</h5>
      <div className={styles.formSection}>
        <div className={styles.inputSection}>
          <label htmlFor="firstName">
            First Name
            <input className={`${isFirstNameError && styles.isError}`} type="text" maxLength={15} id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          {isFirstNameError && <small className={styles.errorMessage}>Invalid first name</small>}
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="lastName">
            Last Name
            <input className={`${isLastNameError && styles.isError}`} type="text" maxLength={15} id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            {isLastNameError && <small className={styles.errorMessage}>Invalid last name</small>}
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
            <input className={`${isPhoneError && styles.isError}`} type="tel" id="phone" maxLength={15} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          {isPhoneError && <small className={styles.errorMessage}>Invalid phone number</small>}
        </div>
      </div>
      <h5>Address</h5>
      <div className={styles.formSection}>
        <div className={styles.inputSection}>
          <label htmlFor="country">
            Country
            <input className={`${isCountryError && styles.isError}`} type="text" maxLength={20} id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </label>
          {isCountryError && <small className={styles.errorMessage}>Invalid country</small>}
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="voivodeship">
            Voivodeship/State
            <input className={`${isVoivodeshipError && styles.isError}`} type="text" maxLength={35} id="voivodeship" value={voivodeship} onChange={(e) => setVoivodeship(e.target.value)} />
          </label>
          {isVoivodeshipError && <small className={styles.errorMessage}>Invalid voivodeship/state</small>}
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="city">
            City
            <input className={`${isCityError && styles.isError}`} type="text" maxLength={35} id="city" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          {isCityError && <small className={styles.errorMessage}>Invalid city</small>}
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="zip">
            Zip code
            <input className={`${isZipCodeError && styles.isError} ${styles.zipInput}`} type="text" maxLength={35} id="zip" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          </label>
          {isZipCodeError && <small className={styles.errorMessage}>Invalid zip code</small>}
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="street">
            Street
            <input className={`${isStreetError && styles.isError}`} type="text" maxLength={20} id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
          </label>
          {isStreetError && <small className={styles.errorMessage}>Invalid street</small>}
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="building">
            Building/Apartment
            <input className={`${isBuildingError && styles.isError}`} type="text" maxLength={10} id="building" value={building} onChange={(e) => setBuilding(e.target.value)} />
          </label>
          {isBuildingError && <small className={styles.errorMessage}>Invalid building/apartment</small>}
        </div>
      </div>
      <div className={styles.submitBtnContainer}>
        <button className={styles.submitBtn} type="submit">Update</button>
        {isGuestProfileUpdated && (
        <div className={styles.checkMark}>
          <FontAwesomeIcon icon={faCheck} />
        </div>
        )}
      </div>
      {loading === 'LOADING_UPDATE_PROFILE' ? (
        <div className={styles.loadingSpinner}>
          <LoadingSpinner />
        </div>
      ) : null}
    </form>
  )
}

export default UserProfileForm
