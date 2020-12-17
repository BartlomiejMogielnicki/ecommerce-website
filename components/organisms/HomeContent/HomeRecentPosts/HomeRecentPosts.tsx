import { FC } from 'react'
import { Post } from 'types'
import Link from 'next/link'
import styles from './HomeRecentPosts.module.scss'

interface Props {
  recentPosts: Post[]
}

const HomeRecentPosts: FC<Props> = ({ recentPosts }) => (
  <div className={styles.recentPostsSection}>
    <h2>Check our recent blog posts:</h2>
    <ul className={styles.postsList}>
      {recentPosts.map((item) => (
        <li key={item.title} className={styles.post}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <button type="button">
            <Link href={`/blog/${item.title.split(' ').join('-').toLowerCase()}`}>
              <a>
                Read more
              </a>
            </Link>
          </button>
        </li>
      ))}
    </ul>
  </div>
)

export default HomeRecentPosts
