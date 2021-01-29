import { FC } from 'react';
import { useRouter } from 'next/router';
import { connectToDB } from 'db/connect';
import { getPosts } from 'db/posts';
import { Post } from 'types';

import PostsList from 'components/organisms/PostsList';
import PostDetails from 'components/molecules/PostDetails';

interface Props {
  posts: Post[]
}

const Blog: FC<Props> = ({ posts }) => {
  const router = useRouter();
  const paramsArr = router.query.param;

  let postsEl = <PostsList posts={posts} />;
  if (paramsArr && paramsArr.length === 1) {
    const singlePost = posts.find((p) => (
      p.title.split(' ').join('-').toLowerCase() === paramsArr[0]
    ));
    postsEl = <PostDetails post={singlePost} />;
  }

  return (
    <>
      {postsEl}
    </>
  );
};

export async function getStaticPaths() {
  const { db } = await connectToDB();
  const fetchedPosts = await getPosts(db);

  return {
    paths: fetchedPosts.map((p) => ({
      params: { param: [p.title.split(' ').join('-').toLowerCase()] },
    })),
    fallback: true,
  };
}

export async function getStaticProps() {
  const { db } = await connectToDB();
  const fetchedPosts = await getPosts(db);
  const posts = fetchedPosts.map((p) => ({
    title: p.title,
    description: p.description,
    content: p.content,
  }));

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
