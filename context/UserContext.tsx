import { useReducer, createContext } from 'react'

const initialState = {
  authenticated: true,
  userName: 'TestUser',
  cart: [],
}

interface ContextProps {
  authenticated: boolean,
  user: string
  cart: [
    {
      _id: string,
      title: string
    }
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
