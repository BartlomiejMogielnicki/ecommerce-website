import { FC } from 'react'
import styles from './Categories.module.scss'
import Link from 'next/link'

const Categories:FC = () => {
  return (
    <div className={styles.container}>
      <h3>Categories:</h3>
      <ul className={styles.list}>
      <li className={styles.item}>
          <Link href="/products">
            <a>All</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/products/cameras">
            <a>Cameras</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/products/mods">
            <a>Mods</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/products/mounts">
            <a>Mounts</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/products/batteries">
            <a>Batteries</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/products/cases">
            <a>Cases</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/products/protection">
            <a>Protection</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Categories