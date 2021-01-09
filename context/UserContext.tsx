import { useReducer, createContext } from 'react'

interface CartObject {
    title: string,
    price: string,
    image: string
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
      title: 'GoPro HERO 9 Black',
      price: '349.99$',
      image: 'https://strapiuploadecommerceimages.s3.eu-central-1.amazonaws.com/gp9_1_c0b10a6e80.jpg',
    },
    {
      title: 'GoPro HERO 8 Black',
      price: '299.99$',
      image: 'https://strapiuploadecommerceimages.s3.eu-central-1.amazonaws.com/gp8_1_9fe20a6816.jpg',
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
