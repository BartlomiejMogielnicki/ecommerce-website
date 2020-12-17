import { FC } from 'react'
import Link from 'next/link'
import { Product } from 'types';
import styles from './HomeBestsGallery.module.scss'

interface Props {
  bestsellers: Product[]
}

const HomeBestsGallery:FC<Props> = ({ bestsellers }) => (
  <div className={styles.bestsSection}>
    <h2>Check our bestsellers:</h2>
    <ul className={styles.bestList}>
      {bestsellers.map((item) => (
        <li key={item.title} className={styles.bestItem}>
          <Link href={`/products/${item.category}/${item.title.split(' ').join('-').toLowerCase()}`}>
            <a>
              <img src={item.images[0].url} alt={item.title} />
              <p><strong>{item.title}</strong></p>
              <p>{item.price}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default HomeBestsGallery
