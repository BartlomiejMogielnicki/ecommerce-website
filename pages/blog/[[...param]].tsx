import { FC } from 'react';
import styles from './blog.module.scss'
import {connectToDB} from '../../db/connect'
import {getPosts} from '../../db/posts'
import { Post } from '../../types'

import Header from '../../components/organisms/Header'

interface Props {
  posts: Post[]
}

const Blog: FC<Props> = ({posts}) => {
  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        <div className={styles.container}>
          {posts.map(p => (
            <div className={styles.post}>
              <h2>{p.title}</h2>
              <p>{`${p.post.substring(0, 300)}...`}</p>
              <button>Read</button>
            </div>
          ))}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export async function getStaticPaths() {
  const { db } = await connectToDB()
  const fetchedPosts = await getPosts(db)

  return {
    paths: fetchedPosts.map((p) => ({
      params: { param: [p.title.split(' ').join('-').toLowerCase()] }
    })),
    fallback: true,
  }
}

export async function getStaticProps() {
  const { db } = await connectToDB()
  const fetchedPosts = await getPosts(db)
  const posts = fetchedPosts.map(p => ({
    title: p.title,
    post: p.post
  }))

  return {
    props: {
      posts
    }
  }
}

export default Blog;