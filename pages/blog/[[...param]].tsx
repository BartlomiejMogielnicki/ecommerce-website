import { FC } from 'react';
import styles from './blog.module.scss'
import {connectToDB} from '../../db/connect'
import {getPosts} from '../../db/posts'
import { Post } from '../../types'
import {useRouter} from 'next/router'

import Header from '../../components/organisms/Header'
import PostsList from '../../components/organisms/PostsList'
import PostDetails from '../../components/atoms/PostDetails'

interface Props {
  posts: Post[]
}

const Blog: FC<Props> = ({posts}) => {
const router = useRouter()
const paramsArr = router.query.param

let postsEl = <PostsList posts={posts}/>
if (paramsArr && paramsArr.length === 1) {
  const singlePost = posts.find(p => (
    p.title.split(' ').join('-').toLowerCase() === paramsArr[0]
  ))
  postsEl = <PostDetails post={singlePost}/>
}

  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        {postsEl}
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