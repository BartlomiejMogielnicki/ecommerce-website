import { FC } from 'react';
import Link from 'next/link';
import styles from './PostDetails.module.scss';
import { Post } from '../../types';

interface Props {
  post: Post
}

const PostDetails:FC<Props> = ({ post }) => (
  <div className={styles.container}>
    <div className={styles.post}>
      <h1>{post.title}</h1>
      <p>{post.post}</p>
    </div>
    <button type="button">
      <Link href="/blog">
        <a>Return to blog</a>
      </Link>
    </button>
  </div>
);

export default PostDetails;
