import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import styles from './Categories.module.scss';

const categoriesList = [
  {
    href: '/products',
    text: 'All',
  },
  {
    href: '/products/cameras',
    text: 'Cameras',
  },
  {
    href: '/products/mods',
    text: 'Mods',
  },
  {
    href: '/products/mounts',
    text: 'Mounts',
  },
  {
    href: '/products/batteries',
    text: 'Baterries',
  },
  {
    href: '/products/cases',
    text: 'Cases',
  },
  {
    href: '/products/protection',
    text: 'Protection',
  },
]

interface Props {
  href: string,
  text: string
}

const CategoryLink:FC<Props> = ({ href, text }) => {
  const router = useRouter()
  let className = `${styles.item}`
  if (router.asPath === href) {
    className = `${styles.item} ${styles.active}`
  }

  return (
    <li className={className}>
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </li>
  )
}

const Categories:FC = () => (
  <div className={styles.container}>
    <h3>Categories:</h3>
    <ul className={styles.list}>
      {categoriesList.map((item) => (
        <CategoryLink key={item.text} href={item.href} text={item.text} />
      ))}
    </ul>
  </div>
)

export default Categories;
