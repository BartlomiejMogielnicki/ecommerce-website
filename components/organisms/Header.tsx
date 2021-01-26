import {
  FC, useContext, useRef, useState, useEffect,
} from 'react';
import {
  faLock, faLockOpen, faShoppingCart, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { UserContext } from 'context/UserContext'

import Nav from 'components/atoms/Nav';
import styles from './Header.module.scss';

const Header:FC = () => {
  const { user, logout } = useContext(UserContext)
  const [isCartFixed, setIsCartFixed] = useState(false)

  const cartRef = useRef(null)

  const router = useRouter()

  useEffect(() => {
    let cartOffsetTop = cartRef.current.getBoundingClientRect().top
    // Set default offset to prevent issue when change page with fixed cart icon
    if (cartOffsetTop < 84) {
      cartOffsetTop = 84
    }
    const handleScroll = () => {
      setIsCartFixed(window.scrollY + 40 > cartOffsetTop)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <div className={styles.topColLogo}>
          <Link href="/">
            <a>
              <img className={styles.shopLogo} src="/shop-logo.png" alt="logo" />
            </a>
          </Link>
        </div>
        <div className={styles.topCol}>
          <Link href="/">
            <a>
              <img className={styles.logo} src="/gopro-logo-300.png" alt="gopro logo" />
            </a>
          </Link>
        </div>
        <div className={styles.topColCart}>
          <Link href="/cart">
            <a>
              <div className={`${styles.cart} ${isCartFixed && styles.fixed} ${router.pathname === '/cart' && styles.hidden}`} ref={cartRef}>
                <FontAwesomeIcon icon={faShoppingCart} />
                <div className={styles.itemsNum}>
                  {user.cart.length}
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
      {user.authenticated ? (
        <div className={styles.user}>
          <div className={styles.userName}>
            <FontAwesomeIcon icon={faUser} />
            <p>{user.userName}</p>
          </div>
          <button type="button" onClick={handleLogout}>
            <a>
              <FontAwesomeIcon icon={faLock} />
              <p>Log Out</p>
            </a>
          </button>
        </div>
      ) : (
        <div className={styles.user}>
          <button type="button">
            <Link href="/sign-in">
              <a>
                <FontAwesomeIcon icon={faUser} />
                <p>Sign In</p>
              </a>
            </Link>
          </button>
          <button type="button">
            <Link href="/log-in">
              <a>
                <FontAwesomeIcon icon={faLockOpen} />
                <p>Log In</p>
              </a>
            </Link>
          </button>
        </div>
      )}
      <Nav />
    </div>
  );
}

export default Header;
