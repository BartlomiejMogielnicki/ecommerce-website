import { FC } from 'react';
import Link from 'next/link';
import LoadingSpinner from 'components/atoms/LoadingSpinner'
import styles from './PostsList.module.scss';

import { Post } from '../../types';

interface Props {
  posts: Post[]
}

const PostsList:FC<Props> = ({ posts }) => (
  <div className={styles.container}>
    {!posts && <LoadingSpinner />}
    {posts && posts.map((p) => (
      <article className={styles.post} key={p.title}>
        <h2>{p.title}</h2>
        <p>{p.description}</p>
        <button type="button">
          <Link href={`/blog/${p.title.split(' ').join('-').toLowerCase()}`}>
            <a>Read more</a>
          </Link>
        </button>
      </article>
    ))}
  </div>
)

export default PostsList;
