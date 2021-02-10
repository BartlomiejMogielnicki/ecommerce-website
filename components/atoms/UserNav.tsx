import { FC, useContext } from 'react';
import Link from 'next/link';
import {
  faUser, faHistory, faShoppingCart, faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from 'context/UserContext'
import styles from './UserNav.module.scss';

const UserNav:FC = () => {
  const { logout } = useContext(UserContext)

  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link href="/profile">
          <a>
            <div className={styles.itemIcon}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <p className={styles.itemText}>Profile</p>
          </a>
        </Link>
      </li>
      <li className={styles.item}>
        <Link href="/history">
          <a>
            <div className={styles.itemIcon}>
              <FontAwesomeIcon icon={faHistory} />
            </div>
            <p className={styles.itemText}>History</p>
          </a>
        </Link>
      </li>
      <li className={styles.item}>
        <Link href="/cart">
          <a>
            <div className={styles.itemIcon}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <p className={styles.itemText}>Cart</p>
          </a>
        </Link>
      </li>
      <li className={styles.item}>
        <button type="button" onClick={logout} className={styles.logoutButton}>
          <div className={styles.itemIcon}>
            <FontAwesomeIcon icon={faPowerOff} />
          </div>
          <p className={styles.itemText}>Log Out</p>
        </button>
      </li>
    </ul>
  );
}

export default UserNav;
