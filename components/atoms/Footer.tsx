import { FC } from 'react'
import Link from 'next/link'
import styles from './Footer.module.scss'

const shortCuts = [
  {
    title: 'Shortcuts',
    links: [
      {
        text: 'GoPro Hero 9 Black',
        href: '/products/cameras/gopro-9-black',
      },
      {
        text: 'GoPro Hero 8 Black',
        href: '/products/cameras/gopro-8-black',
      },
      {
        text: 'Blog',
        href: '/blog',
      },
    ],
  },
  {
    title: 'Products',
    links: [
      {
        text: 'Cameras',
        href: '/products/cameras',
      },
      {
        text: 'Mods',
        href: '/products/mods',
      },
      {
        text: 'Mounts',
        href: '/products/mounts',
      },
      {
        text: 'Baterries',
        href: '/products/baterries',
      },
      {
        text: 'Cases',
        href: '/products/cases',
      },
      {
        text: 'Protection',
        href: '/products/protection',
      },
    ],
  },
  {
    title: 'About',
    links: [
      {
        text: 'Contact',
        href: '/contact',
      },
      {
        text: 'Regulations',
        href: '/regulations',
      },
    ],
  },
]

const Footer:FC = () => (
  <div className={styles.container}>
    <div className={styles.shortcutsContainer}>
      {shortCuts.map((item) => (
        <ul key={item.title} className={styles.shortcutsColumn}>
          <h4>{item.title}</h4>
          {item.links.map((link) => (
            <li key={link.text} className={styles.shortcutsItem}>
              <Link href={link.href}>
                <a>{link.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
)

export default Footer
