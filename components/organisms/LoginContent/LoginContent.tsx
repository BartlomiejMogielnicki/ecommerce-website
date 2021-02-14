import { FC, useContext } from 'react'
import Form from 'components/atoms/Form'
import { UserContext } from 'context/UserContext'
import LoadingSpinner from 'components/atoms/LoadingSpinner'
import styles from './LoginContent.module.scss'

interface Props {
  type: string
}

const LoginContent:FC<Props> = ({ type }) => {
  const { user: { loading } } = useContext(UserContext)

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>{type === 'login' ? 'Log' : 'Sign'}</h2>
        <h2>{type === 'login' ? 'in' : 'up'}</h2>
      </div>
      <div className={styles.formContainer}>
        <>
          <Form type={type} />
          {loading === 'LOADING_LOGIN' ? (
            <div className={styles.loadingSpinner}>
              <LoadingSpinner />
            </div>
          ) : null}
        </>
      </div>
    </div>
  )
}

export default LoginContent
