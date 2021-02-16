# Ecommerce nextjs website

Fast ecommerce website made in Next and Typescript. Data stored in mongodb - users, orders, products and blog posts. Edit products and blog posts in Strapi connected with mongodb and AWS S3 to store images. Website is fully secured with hashed user password, safe httponly cookies and jsonwebtokens. Purchase as a guest after fill in the guest user informations form or log in to save your data for next purchases and keep track of your purchase history. Click BUY to send to database new order with cart items and user informations.

## Live

https://ecommerce-nextjs-website.vercel.app/

## Technologies

- Next 10.0.3
- React 17.0.1
- TypeScript 4.1.2
- Mongodb 3.6.3
- Bcrypt 5.0.0
- Cookie 0.4.1
- Jsonwebtoken 8.5.1
- Sass 1.30.0

- Strapi - edit database content (e.g. add new products or blog posts)
- AWS S3 - image storage
- Vercel - hosting

## Features

- Fast ecommerce website
- Sorted products list with categories and search option
- Blog posts section
- Shopping cart system
- Purchase as a guest
- Log in to save your data for next purchases and keep track of your purchase history
- Data stored in mongodb with hashed user password
- Safe httponly cookies
- New orders send to database with cart items and user informations

## Screenshots

### Home Page

![Home Page](./public/img/screens/home-page.jpg)

### Products Page

![Products Page](./public/img/screens/products-page.jpg)

### Single Product Page

![Single Product Page](./public/img/screens/product-details-page.jpg)

### Home Page

![Home Page](./public/img/screens/blog-page.jpg)

### Single Post Page

![Single Post Page](./public/img/screens/post-page.jpg)

### Contact Page

![Contact Page](./public/img/screens/contact-page.jpg)

### Log In Page

![Log In Page](./public/img/screens/login-page.jpg)

### Cart Page

![Cart Page](./public/img/screens/cart-page.jpg)
