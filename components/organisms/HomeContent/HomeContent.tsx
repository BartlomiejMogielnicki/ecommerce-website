import { FC } from 'react'
import Link from 'next/link'
import ReactPlayer from 'react-player'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product } from 'types';
import HomeAdvGallery from 'components/organisms/HomeContent/HomeAdvGallery/HomeAdvGallery'
import HomeBestsGallery from 'components/organisms/HomeContent/HomeBestsGallery/HomeBestsGallery'
import styles from './HomeContent.module.scss'

interface Props {
  bestsellers: Product[]
}

const HomeContent:FC<Props> = ({ bestsellers }) => (
  <div className={styles.wrapper}>
    <HomeAdvGallery />
    <div className={styles.advNavigateContainer}>
      <a href="#video">
        <FontAwesomeIcon icon={faAngleDown} />
        <p>Watch the trailer!</p>
      </a>
    </div>
    <div className={styles.videoSection} id="video">
      <div className={styles.videoContainer}>
        <ReactPlayer url="https://www.youtube.com/watch?v=xYX6b1-9Coo" controls width="100%" height="100%" />
      </div>
      <button type="button">
        <Link href="/products/cameras/gopro-9-black">
          <a>GoPro HERO9 Black - Details</a>
        </Link>
      </button>
    </div>
    <HomeBestsGallery bestsellers={bestsellers} />
  </div>
)

export default HomeContent
