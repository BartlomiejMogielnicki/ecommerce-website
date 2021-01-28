import { FC } from 'react';
import Link from 'next/link';
import styles from './PostsList.module.scss';

import { Post } from '../../types';

interface Props {
  posts: Post[]
}

const PostsList:FC<Props> = ({ posts }) => (
  <div className={styles.container}>
    {posts && posts.map((p) => (
      <div className={styles.post} key={p.title}>
        <h2>{p.title}</h2>
        <p>{p.description}</p>
        <button type="button">
          <Link href={`/blog/${p.title.split(' ').join('-').toLowerCase()}`}>
            <a>Read more</a>
          </Link>
        </button>
      </div>
    ))}
  </div>
)

export default PostsList;
