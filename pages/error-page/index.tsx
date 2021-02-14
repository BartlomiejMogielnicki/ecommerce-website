import { FC } from 'react';
import styles from './error-page.module.scss'

const ErrorPage: FC = () => (
  <div className={styles.container}>
    <h2>Oooops... something went wrong...</h2>
    <h2>Please try again.</h2>
  </div>
)

export default ErrorPage;
