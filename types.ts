export interface Product {
  _id: string
  title: string
  category: string
  image: string
  shortDescription: string
  description: string
  price: number
  bestseller: boolean
  images: [
    {
      name: string
      url: string
    },
  ]
}

export interface Post {
  title: string
  description: string
  content: string
}

export interface CartObject {
  title: string
  category: string
  price: number
  image: string
  quantity: number
}

export interface HistoryObject {
  orderDate: string
  orderStatus: string
  cart: CartObject[]
}

export interface UserProfile {
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  country?: string
  voivodeship?: string
  city?: string
  zipCode?: string
  street?: string
  building?: string
}

export interface ContextProps {
  user: {
    authenticated: boolean
    userName: string
    cart: CartObject[]
    history: HistoryObject[]
    userData: UserProfile
    error: string
  }
  addToCart: (title: string, category: string, price: number, image: string) => void
  deleteFromCart: (title: string) => void
  changeQuantity: (title: string, operation: string) => void
  purchase: (cart: CartObject[], userData: UserProfile) => void
  logout: () => void
  login: (username: string, password: string) => void
  signin: (username: string, email: string, password: string) => void
  cookieLogin: () => void
  updateProfile: (userData: UserProfile) => void
  updateGuestProfile: (userData: UserProfile) => void
}
