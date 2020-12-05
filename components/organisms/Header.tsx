import { FC } from 'react'
import styles from './Header.module.css'

import Nav from '../atoms/Nav'
import Search from '../atoms/Search'

const Header:FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <div className={styles.topCol}>
          <img className={styles.logo} src="/gopro-logo-300.png" alt="gopro logo"/>
        </div>
        <div className={styles.topCol}>
          <Search/>
        </div>
        <div className={styles.topColCart}>
          Cart
        </div>
      </div>
      <Nav/>
    </div>
  )
}

export default Header;