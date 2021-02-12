import { useReducer, createContext, useCallback } from 'react'

const URL = 'http://localhost:3000';

interface CartObject {
    title: string,
    category: string,
    price: number,
    image: string,
    quantity: number
}

interface HistoryObject {
  orderDate: string,
  orderStatus: string,
  cart: CartObject[]
}

interface ContextProps {
  user: {
    authenticated: boolean,
    userName: string,
    cart: CartObject[],
    history: HistoryObject[]
    userData: {
      firstName: string,
      lastName: string,
      email: string,
      phoneNumber: string,
      country: string,
      voivodeship: string,
      city: string,
      zipCode: string,
      street: string,
      bulding: string,
    }
  },
  addToCart: (title: string, category: string, price: number, image: string) => void,
  deleteFromCart: (title: string) => void,
  changeQuantity: (title: string, operation: string) => void,
  purchase: (cart: CartObject[]) => void,
  logout: () => void,
  login: (username: string, password: string) => void,
  signin: (username: string, email: string, password: string) => void,
  cookieLogin: () => void
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
const GUEST_ADD_TO_CART = 'GUEST_ADD_TO_CART'
const GUEST_DELETE_ITEM = 'GUEST_DELETE_ITEM'
const GUEST_CHANGE_QUANTITY = 'GUEST_CHANGE_QUANTITY'
const GUEST_PURCHASE = 'GUEST_PURCHASE'

const reducer = (state, action) => {
  if (action.type === UPDATE_CART && action.payload.history) {
    return {
      ...state,
      cart: action.payload.cart,
      history: action.payload.history,
    }
  }

  if (action.type === UPDATE_CART && !action.payload.history) {
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
      userData: action.payload.user.userData,
    }
  }

  if (action.type === GUEST_ADD_TO_CART) {
    const newProduct: CartObject = {
      title: action.payload.title,
      category: action.payload.category,
      price: action.payload.price,
      image: action.payload.image,
      quantity: 1,
    }
    return {
      ...state,
      cart: [...state.cart, newProduct],
    }
  }

  if (action.type === GUEST_DELETE_ITEM) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.title !== action.payload.title),
    }
  }

  if (action.type === GUEST_CHANGE_QUANTITY) {
    if (action.payload.operation === 'inc') {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.title === action.payload.title) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }
          return item
        }),
      }
    }
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (item.title === action.payload.title) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
        return item
      }),
    }
  }

  if (action.type === GUEST_PURCHASE) {
    return {
      ...state,
      cart: [],
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
      if (!user.authenticated) {
        dispatch({
          type: GUEST_ADD_TO_CART,
          payload: {
            title, category, price, image,
          },
        })
      } else {
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
      }
    }, [dispatch, user.authenticated],
  )

  const deleteFromCart = useCallback((title: string) => {
    if (!user.authenticated) {
      dispatch({
        type: GUEST_DELETE_ITEM,
        payload: {
          title,
        },
      })
    } else {
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
    }
  }, [dispatch, user.authenticated])

  const changeQuantity = useCallback((title: string, operation: string) => {
    if (!user.authenticated) {
      dispatch({
        type: GUEST_CHANGE_QUANTITY,
        payload: {
          title, operation,
        },
      })
    } else {
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
    }
  }, [dispatch, user.authenticated])

  const purchase = useCallback((cart: CartObject[]) => {
    if (!user.authenticated) {
      dispatch({
        type: GUEST_PURCHASE,
      })
    } else {
      fetch(`${URL}/api/cart/purchase`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ cart }),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      }).then((data) => dispatch({
        type: UPDATE_CART,
        payload: {
          cart: data.cart,
          history: data.history,
        },
      })).catch((error) => console.log(error))
    }
  }, [dispatch, user.authenticated])

  const logout = useCallback(() => {
    fetch(`${URL}/api/logout`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      }).then(() => dispatch({
        type: LOG_OUT,
      })).catch((error) => console.log(error))
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

  const cookieLogin = useCallback(() => {
    fetch(`${URL}/api/cookieLogin`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      }).then((data) => dispatch({
        type: LOG_IN, payload: data,
      })).catch((error) => error)
  }, [dispatch])

  const value = {
    user, addToCart, deleteFromCart, changeQuantity, purchase, logout, login, signin, cookieLogin,
  }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}
