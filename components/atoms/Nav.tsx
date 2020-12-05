import { FC } from 'react'
import Link from 'next/link'
import styles from './Nav.module.css'

const Nav:FC = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li className={styles.item}>
        <Link href="/about">
          <a>About</a>
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
  )
}

export default Nav