import { FC } from 'react'
import styles from './Header.module.scss'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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
        <div className={`${styles.topCol} ${styles.topColCart}`}>
          <div className={styles.cart}><FontAwesomeIcon icon={faShoppingCart} />
            My Cart
            <div className={styles.itemsNum}>0</div>
          </div>
        </div>
      </div>
      <Nav/>
    </div>
  )
}

export default Header;