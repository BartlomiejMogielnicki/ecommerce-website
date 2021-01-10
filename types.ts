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
