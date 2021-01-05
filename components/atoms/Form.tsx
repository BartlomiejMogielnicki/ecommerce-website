import { FC } from 'react'
import styles from './Form.module.scss'

interface Props {
  type: string
}

const Form:FC<Props> = ({ type }) => (
  <form>
    <div>
      <label htmlFor="username">
        Username
        <input type="text" id="username" />
      </label>
    </div>
    {type === 'signin' && (
    <div>
      <label htmlFor="email">
        E-mail
        <input type="email" id="email" />
      </label>
    </div>
    )}
    <div>
      <label htmlFor="password">
        Password
        <input type="password" id="password" />
      </label>
    </div>
    {type === 'signin' && (
    <div>
      <label htmlFor="password2">
        Confirm Password
        <input type="password" id="password2" />
      </label>
    </div>
    )}
    <button type="submit">Submit</button>
  </form>
)

export default Form
