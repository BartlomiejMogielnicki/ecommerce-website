import { FC } from 'react';
import Link from 'next/link';
import {
  faHome, faShoppingBasket, faBookReader, faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Nav.module.scss';

const Nav:FC = () => (
  <ul className={styles.list}>
    <li className={styles.item}>
      <Link href="/">
        <a>
          <p className={styles.itemText}>Home</p>
          <a className={styles.itemIcon}>
            <FontAwesomeIcon icon={faHome} />
          </a>
        </a>
      </Link>
    </li>
    <li className={styles.item}>
      <Link href="/products">
        <a>
          <p className={styles.itemText}>Products</p>
          <a className={styles.itemIcon}>
            <FontAwesomeIcon icon={faShoppingBasket} />
          </a>
        </a>
      </Link>
    </li>
    <li className={styles.item}>
      <Link href="/blog">
        <a>
          <p className={styles.itemText}>Blog</p>
          <a className={styles.itemIcon}>
            <FontAwesomeIcon icon={faBookReader} />
          </a>
        </a>
      </Link>
    </li>
    <li className={styles.item}>
      <Link href="/contact">
        <a>
          <p className={styles.itemText}>Contact</p>
          <a className={styles.itemIcon}>
            <FontAwesomeIcon icon={faPhone} />
          </a>
        </a>
      </Link>
    </li>
  </ul>
);

export default Nav;
