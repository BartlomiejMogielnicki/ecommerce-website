import { FC } from 'react';
import Link from 'next/link';
import ContactDetails from 'components/atoms/ContactDetails'
import styles from './Footer.module.scss'

const shortcuts = [
  {
    title: 'Popular',
    links: [
      {
        text: 'GoPro Hero 9 Black',
        href: '/products/cameras/gopro-hero-9-black',
      },
      {
        text: 'GoPro Hero 8 Black',
        href: '/products/cameras/gopro-hero-8-black',
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
    title: 'User',
    links: [
      {
        text: 'My profile',
        href: '/profile',
      },
      {
        text: 'History',
        href: '/history',
      },
      {
        text: 'Cart',
        href: '/cart',
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

const Footer:FC = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className={styles.container}>
      <div className={styles.shortcutsContainer}>
        {shortcuts.map((item) => (
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
      <ContactDetails />
      <div className={styles.copyrightContainer}>
        <p>
          Copyright &copy;
          {currentYear}
        </p>
      </div>
    </div>
  )
}

export default Footer
