import {FC} from 'react'
import styles from './PostsList.module.scss'
import Link from 'next/link'

import { Post } from '../../types'

interface Props {
  products: Post[]
}

const PostsList:FC<Post> = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts && posts.map(p => (
        <div className={styles.post} key={p.title}>
          <h2>{p.title}</h2>
          <p>{`${p.post.substring(0, 300)}...`}</p>
          <button>
            <Link href={`/blog/${p.title.split(' ').join('-').toLowerCase()}`}>
              <a>Read</a>
            </Link>
          </button>
        </div>
      ))}
  </div>
  )
}

export default PostsList