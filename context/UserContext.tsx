import { useReducer, createContext, useCallback } from 'react'

const URL = 'http://localhost:3000';

interface CartObject {
    title: string,
    category: string,
    price: number,
    image: string,
    quantity: number
}

interface ContextProps {
  user: {
    authenticated: boolean,
    userName: string,
    cart: CartObject[],
    history: []
  },
  addToCart: (title: string, category: string, price: number, image: string) => void,
  deleteFromCart: (title: string) => void,
  changeQuantity: (title: string, operation: string) => void,
  logout: () => void,
  login: (username: string, password: string) => void,
  signin: (username: string, email: string, password: string) => void
}

const initialState = {
  authenticated: false,
  userName: '',
  cart: [],
  history: [],
}

export const UserContext = createContext<Partial<ContextProps>>({})

const UPDATE_CART = 'UPDATE_CART'
const LOG_OUT = 'LOG_OUT'
const LOG_IN = 'LOG_IN'

const reducer = (state, action) => {
  if (action.type === UPDATE_CART) {
    return {
      ...state,
      cart: action.payload.cart,
    }
  }

  if (action.type === LOG_OUT) {
    return {
      authenticated: false,
      userName: null,
      cart: [],
    }
  }

  if (action.type === LOG_IN) {
    return {
      authenticated: true,
      userName: action.payload.user.username,
      cart: action.payload.user.cart,
      history: action.payload.user.history,
    }
  }

  return state;
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState)

  const addToCart = useCallback(
    (
      title, category, price, image,
    ) => {
      fetch(`${URL}/api/cart/add-product`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          product: {
            title, category, price, image, quantity: 1,
          },
        }),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      }).then((data) => dispatch({
        type: UPDATE_CART,
        payload: {
          cart: data.cart,
        },
      })).catch((error) => console.log(error))
    }, [dispatch],
  )

  const deleteFromCart = useCallback((title: string) => {
    fetch(`${URL}/api/cart/delete-product`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ title }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    }).then((data) => dispatch({
      type: UPDATE_CART,
      payload: {
        cart: data.cart,
      },
    })).catch((error) => console.log(error))
  }, [dispatch])

  const changeQuantity = useCallback((title: string, operation: string) => {
    fetch(`${URL}/api/cart/change-quantity`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ title, operation }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    }).then((data) => dispatch({
      type: UPDATE_CART,
      payload: {
        cart: data.cart,
      },
    })).catch((error) => console.log(error))
  }, [dispatch])

  const logout = useCallback(() => {
    dispatch({
      type: LOG_OUT,
    })
  }, [dispatch])

  const login = useCallback((username: string, password: string) => {
    fetch(`${URL}/api/login`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    }).then((data) => dispatch({
      type: LOG_IN, payload: data,
    })).catch((error) => console.log(error))
  }, [dispatch])

  const signin = useCallback((username: string, email: string, password: string) => {
    fetch(`${URL}/api/signin`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    }).then((data) => dispatch({
      type: LOG_IN, payload: data,
    })).catch((error) => console.log(error))
  }, [dispatch])

  const value = {
    user, addToCart, deleteFromCart, changeQuantity, logout, login, signin,
  }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}
