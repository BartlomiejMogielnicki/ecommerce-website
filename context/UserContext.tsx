import { useReducer, createContext } from 'react'

interface CartObject {
    _id: string,
    title: string
}

interface ContextProps {
  user: {
    authenticated: boolean,
    userName: string,
    cart: CartObject[]
  }
}

const initialState = {
  authenticated: true,
  userName: 'TestUser',
  cart: [
    {
      _id: '1',
      title: 'one',
    },
    {
      _id: '2',
      title: 'two',
    },
  ],
}

export const UserContext = createContext<Partial<ContextProps>>({})

const reducer = (state, action) => state

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState)

  const value = { user }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}
