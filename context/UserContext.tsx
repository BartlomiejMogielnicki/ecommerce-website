import {
  useReducer, createContext, useCallback,
} from 'react'

import { ContextProps, CartObject, UserProfile } from 'types'

const URL = 'http://localhost:3000';

const initialState = {
  authenticated: false,
  userName: '',
  cart: [],
  history: [],
  userData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    voivodeship: '',
    city: '',
    zipCode: '',
    street: '',
    building: '',
  },
  error: '',
}

export const UserContext = createContext<Partial<ContextProps>>({})

const UPDATE_CART = 'UPDATE_CART'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const LOG_OUT = 'LOG_OUT'
const LOG_IN = 'LOG_IN'
const GUEST_ADD_TO_CART = 'GUEST_ADD_TO_CART'
const GUEST_DELETE_ITEM = 'GUEST_DELETE_ITEM'
const GUEST_CHANGE_QUANTITY = 'GUEST_CHANGE_QUANTITY'
const GUEST_PURCHASE = 'GUEST_PURCHASE'
const UPDATE_ERROR = 'UPDATE_ERROR'
const UPDATE_LOADER = 'UPDATE_LOADER'

const LOADING_PURCHASE = 'LOADING_PURCHASE'

const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'
const UNKNOWN_ERROR = 'UNKNOWN_ERROR'
const PURCHASE_ERROR = 'PURCHASE_ERROR'

const reducer = (state, action) => {
  if (action.type === UPDATE_PROFILE) {
    return {
      ...state,
      userData: action.payload.userData,
    }
  }

  if (action.type === UPDATE_CART && action.payload.history) {
    return {
      ...state,
      cart: action.payload.cart,
      history: action.payload.history,
      loading: '',
    }
  }

  if (action.type === UPDATE_CART && !action.payload.history) {
    return {
      ...state,
      cart: action.payload.cart,
      loading: '',
    }
  }

  if (action.type === LOG_OUT) {
    return {
      authenticated: false,
      userName: null,
      cart: [],
      history: [],
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        voivodeship: '',
        city: '',
        zipCode: '',
        street: '',
        building: '',
      },
      error: '',
    }
  }

  if (action.type === LOG_IN) {
    return {
      authenticated: true,
      userName: action.payload.user.username,
      cart: action.payload.user.cart,
      history: action.payload.user.history,
      userData: action.payload.user.userData,
      error: '',
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

  if (action.type === UPDATE_LOADER) {
    return {
      ...state,
      loading: action.payload.loading,
    }
  }

  if (action.type === UPDATE_ERROR) {
    return {
      ...state,
      error: action.payload.error,
      loading: '',
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

  const purchase = useCallback((cart: CartObject[], userData: UserProfile) => {
    dispatch({
      type: UPDATE_LOADER,
      payload: {
        loading: LOADING_PURCHASE,
      },
    })

    if (!user.authenticated) {
      fetch(`${URL}/api/cart/guest-purchase`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ cart, userData }),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(UNKNOWN_ERROR);
      }).then(() => dispatch({
        type: UPDATE_CART,
        payload: {
          cart: [],
          history: [],
        },
      })).catch((error) => {
        dispatch({
          type: UPDATE_ERROR,
          payload: {
            error: error.message,
          },
        })
      })
    } else {
      fetch(`${URL}/api/cart/purchase`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ cart, userData }),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(UNKNOWN_ERROR);
      }).then((data) => dispatch({
        type: UPDATE_CART,
        payload: {
          cart: data.cart,
          history: data.history,
        },
      })).catch((error) => {
        dispatch({
          type: UPDATE_ERROR,
          payload: {
            error: error.message,
          },
        })
      })
    }
  }, [dispatch, user.authenticated])

  const logout = useCallback(() => {
    fetch(`${URL}/api/logout`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(UNKNOWN_ERROR);
      }).then(() => dispatch({
        type: LOG_OUT,
      })).catch((error) => {
        dispatch({
          type: UPDATE_ERROR,
          payload: {
            error: error.message,
          },
        })
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
      if (!response.ok && response.status === 401) {
        throw new Error(INVALID_CREDENTIALS);
      }
      throw new Error(UNKNOWN_ERROR);
    }).then((data) => dispatch({
      type: LOG_IN, payload: data,
    })).catch((error) => {
      dispatch({
        type: UPDATE_ERROR,
        payload: {
          error: error.message,
        },
      })
    })
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
      throw new Error(UNKNOWN_ERROR);
    }).then((data) => dispatch({
      type: LOG_IN, payload: data,
    })).catch((error) => {
      dispatch({
        type: UPDATE_ERROR,
        payload: {
          error: error.message,
        },
      })
    })
  }, [dispatch])

  const cookieLogin = useCallback(() => {
    fetch(`${URL}/api/cookie-login`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      }).then((data) => dispatch({
        type: LOG_IN, payload: data,
      })).catch((error) => error)
  }, [dispatch])

  const updateProfile = useCallback((userData) => {
    fetch(`${URL}/api/update-profile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ userData }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      }).then((data) => dispatch({
        type: UPDATE_PROFILE, payload: data,
      })).catch((error) => console.log(error))
  }, [dispatch])

  const updateGuestProfile = useCallback((userData) => {
    dispatch({
      type: UPDATE_PROFILE,
      payload: { userData },
    })
  }, [dispatch])

  const resetError = useCallback(() => {
    dispatch({
      type: UPDATE_ERROR,
      payload: {
        error: '',
      },
    })
  }, [dispatch])

  const value = {
    user, addToCart, deleteFromCart, changeQuantity, purchase, logout, login, signin, cookieLogin, updateProfile, updateGuestProfile, resetError,
  }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}
