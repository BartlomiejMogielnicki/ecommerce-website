import { FC } from 'react'
import Link from 'next/link'
import styles from './HomeBestsGallery.module.scss'

const bestsellers = [
  {
    imgSrc: '/best-gp8.jpg',
    title: 'GoPro 8 Black',
    category: 'cameras',
    price: '299.99$',
  },
  {
    imgSrc: '/best-gp8.jpg',
    title: 'GoPro 8 Black',
    category: 'cameras',
    price: '299.99$',
  },
  {
    imgSrc: '/best-gp7.jpg',
    title: 'GoPro 7 Black',
    category: 'cameras',
    price: '249.99$',
  },
  {
    imgSrc: '/best-gp7.jpg',
    title: 'GoPro 7 Black',
    category: 'cameras',
    price: '249.99$',
  },
]

const HomeBestsGallery:FC = () => (
  <div className={styles.bestsSection}>
    <h2>Check our bestsellers:</h2>
    <ul className={styles.bestList}>
      {bestsellers.map((item) => (
        <li key={item.title} className={styles.bestItem}>
          <Link href={`/products/${item.category}/${item.title.split(' ').join('-').toLowerCase()}`}>
            <a>
              <img src={item.imgSrc} alt={item.title} />
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
