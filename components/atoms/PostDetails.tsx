import {FC} from 'react'
import styles from './PostDetails.module.scss'
import {Post} from '../../types'
import Link from 'next/link'

interface Props {
  post: Post
}

const PostDetails:FC<Props> = ({post}) => {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <h1>{post.title}</h1>
        <p>{post.post}</p>
      </div>
      <button>
            <Link href='/blog'>
              <a>Return to blog</a>
            </Link>
          </button>
    </div>
  )
}

export default PostDetails