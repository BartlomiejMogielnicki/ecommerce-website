import { FC } from 'react'
import styles from './Search.module.scss'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Search:FC = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label htmlFor="search"></label>
        <input type="text" id="search" placeholder="Enter your search..." className={styles.input}/>
        <button type="submit" className={styles.button}><FontAwesomeIcon icon={faSearch}/></button>
      </form>
    </div>
  )
}

export default Search;