import {FC} from 'react'
import styles from './PostDetails.module.scss'

const PostDetails:FC = ({post}) => {
  return (
    <div>
      {post.title}
    </div>
  )
}

export default PostDetails