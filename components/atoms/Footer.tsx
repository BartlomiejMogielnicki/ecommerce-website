import { FC } from 'react';
import Link from 'next/link';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss'

const shortCuts = [
  {
    title: 'Popular',
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
    <div className={styles.contactContainer}>
      <div className={styles.contactInfo}>
        <div>
          <a><FontAwesomeIcon icon={faPhone} /></a>
          111-222-333
        </div>
        <div>
          <a><FontAwesomeIcon icon={faEnvelope} /></a>
          shopgopro@fakemail.pl
        </div>
      </div>
      <div className={styles.socialContainer}>
        <a>
          <FontAwesomeIcon icon={faFacebookSquare} />
        </a>
        <a>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </div>
    <div className={styles.copyrightContainer}><p>Copyright &copy; 2020</p></div>
  </div>
)

export default Footer
