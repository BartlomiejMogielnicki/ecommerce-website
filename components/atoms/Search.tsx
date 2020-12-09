import { FC } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';

const Search:FC = () => (
  <div className={styles.container}>
    <form className={styles.form}>
      <label htmlFor="search">
        <input type="text" id="search" placeholder="Enter your search..." className={styles.input} />
      </label>
      <button type="submit" className={styles.button}><FontAwesomeIcon icon={faSearch} /></button>
    </form>
  </div>
);

export default Search;
