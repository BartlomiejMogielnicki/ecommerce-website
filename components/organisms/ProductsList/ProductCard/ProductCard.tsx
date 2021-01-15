import { FC, useContext } from 'react';
import Link from 'next/link';
import { UserContext } from 'context/UserContext'
import styles from './ProductCard.module.scss';

type Props = {
  title: string,
  image: string,
  category: string,
  shortDescription: string,
  price: number,
  bestseller: boolean
}

const ProductCard:FC<Props> = ({
  title, image, category, shortDescription, price, bestseller,
}) => {
  const { user: { authToken }, addToCart } = useContext(UserContext)

  const linkTitle = title.split(' ').join('-').toLowerCase();

  return (
    <div className={styles.container}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{shortDescription}</p>
      <p>
        <strong>
          {price}
          {' $'}
        </strong>
      </p>
      {bestseller && <div className={styles.ribbon}><span>Bestseller</span></div>}
      <div className={styles.btnsContainer}>
        <button type="button">
          <Link href={`/products/${category}/${linkTitle}`}>
            <a>Details</a>
          </Link>
        </button>
        <button type="button" onClick={() => addToCart(authToken, title, category, price, image)}>
          <p>Add to cart</p>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
