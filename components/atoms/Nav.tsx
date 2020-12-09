import { FC } from 'react';
import Link from 'next/link';
import styles from './Nav.module.scss';

const Nav:FC = () => (
  <ul className={styles.list}>
    <li className={styles.item}>
      <Link href="/">
        <a>Home</a>
      </Link>
    </li>
    <li className={styles.item}>
      <Link href="/products">
        <a>Products</a>
      </Link>
    </li>
    <li className={styles.item}>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
    </li>
    <li className={styles.item}>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </li>
  </ul>
);

export default Nav;
