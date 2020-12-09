import { FC } from 'react';
import { faLockOpen, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Nav from 'components/atoms/Nav';
import Search from 'components/atoms/Search';
import styles from './Header.module.scss';

const Header:FC = () => (
  <div className={styles.container}>
    <div className={styles.topRow}>
      <div className={styles.topCol}>
        <img className={styles.logo} src="/gopro-logo-300.png" alt="gopro logo" />
      </div>
      <div className={styles.topCol}>
        <Search />
      </div>
      <div className={`${styles.topCol} ${styles.topColCart}`}>
        <div className={styles.cart}>
          <FontAwesomeIcon icon={faShoppingCart} />
          My Cart
          <div className={styles.itemsNum}>0</div>
        </div>
      </div>
    </div>
    <div className={styles.user}>
      <button type="button">
        <FontAwesomeIcon icon={faUser} />
        <p>Register </p>
      </button>
      <button type="button">
        <FontAwesomeIcon icon={faLockOpen} />
        <p>Log In</p>
      </button>
    </div>
    <Nav />
  </div>
);

export default Header;
