import { FC } from 'react'
import styles from './Search.module.css'

const Search:FC = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label htmlFor="search"></label>
        <input type="text" id="search" placeholder="Enter your search..." className={styles.input}/>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  )
}

export default Search;