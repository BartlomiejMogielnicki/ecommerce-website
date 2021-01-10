import { useReducer, createContext, useCallback } from 'react'

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
    cart: CartObject[]
  },
  addToCart: (title: string, category: string, price: number, image: string) => void,
  deleteFromCart: (title: string) => void,
  increaseQuantity: (title: string) => void,
  decreaseQuantity: (title: string) => void
}

const initialState = {
  authenticated: true,
  userName: 'TestUser',
  cart: [
    {
      title: 'GoPro HERO 9 Black',
      category: 'cameras',
      price: 349.99,
      image: 'https://strapiuploadecommerceimages.s3.eu-central-1.amazonaws.com/gp9_1_c0b10a6e80.jpg',
      quantity: 1,
    },
    {
      title: 'GoPro HERO 8 Black',
      category: 'cameras',
      price: 299.99,
      image: 'https://strapiuploadecommerceimages.s3.eu-central-1.amazonaws.com/gp8_1_9fe20a6816.jpg',
      quantity: 1,
    },
  ],
}

export const UserContext = createContext<Partial<ContextProps>>({})

const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'

const reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    if (state.cart.every((item) => item.title !== action.payload.title)) {
      return {
        ...state, cart: [action.payload, ...state.cart],
      }
    }
    return state;
  }

  if (action.type === DELETE_FROM_CART) {
    return {
      ...state, cart: state.cart.filter((item) => item.title !== action.payload.title),
    }
  }

  if (action.type === INCREASE_QUANTITY) {
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (item.title === action.payload.title) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return {
          ...item,
        }
      }),
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    return {
      ...state,
      cart: state.cart.map((item) => {
        if ((item.title === action.payload.title) && (item.quantity > 0)) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
        return {
          ...item,
        }
      }),
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
      dispatch({
        type: ADD_TO_CART,
        payload: {
          title,
          category,
          price,
          image,
          quantity: 1,
        },
      });
    },
    [dispatch],
  );

  const deleteFromCart = useCallback((title) => {
    dispatch({
      type: DELETE_FROM_CART,
      payload: {
        title,
      },
    });
  },
  [dispatch])

  const increaseQuantity = useCallback((title) => {
    dispatch({
      type: INCREASE_QUANTITY,
      payload: {
        title,
      },
    });
  }, [dispatch])

  const decreaseQuantity = useCallback((title) => {
    dispatch({
      type: DECREASE_QUANTITY,
      payload: {
        title,
      },
    });
  }, [dispatch])

  const value = {
    user, addToCart, deleteFromCart, increaseQuantity, decreaseQuantity,
  }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}
