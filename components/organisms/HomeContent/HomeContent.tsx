import { FC } from 'react'
import Link from 'next/link'
import ReactPlayer from 'react-player'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeAdvGallery from 'components/organisms/HomeContent/HomeAdvGallery/HomeAdvGallery'
import HomeBestsGallery from 'components/organisms/HomeContent/HomeBestsGallery/HomeBestsGallery'
import styles from './HomeContent.module.scss'

const HomeContent:FC = () => (
  <div className={styles.wrapper}>
    <HomeAdvGallery />
    <div className={styles.advNavigateContainer}>
      <a href="#videoSection">
        <FontAwesomeIcon icon={faAngleDown} />
        <p>Watch the trailer!</p>
      </a>
    </div>
    <div className={styles.videoSection} id="videoSection">
      <div className={styles.videoContainer}>
        <ReactPlayer url="https://www.youtube.com/watch?v=xYX6b1-9Coo" controls width="100%" height="100%" />
      </div>
      <button type="button">
        <Link href="/products/cameras/gopro-9-black">
          <a>GoPro HERO9 Black - Details</a>
        </Link>
      </button>
    </div>
    <HomeBestsGallery />
  </div>
)

export default HomeContent
