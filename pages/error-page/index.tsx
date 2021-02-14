import { FC, useEffect, useContext } from 'react';
import { UserContext } from 'context/UserContext'
import styles from './error-page.module.scss'

const ErrorPage: FC = () => {
  const { resetError } = useContext(UserContext)

  useEffect(() => {
    resetError()
  }, [resetError])

  return (
    <div className={styles.container}>
      <h2>Oooops... something went wrong...</h2>
      <h2>Please try again.</h2>
    </div>
  )
}

export default ErrorPage;
