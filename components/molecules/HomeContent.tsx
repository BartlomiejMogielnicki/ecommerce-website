import { FC } from 'react'
import Link from 'next/link'
import ReactPlayer from 'react-player'
import styles from './HomeContent.module.scss'

const HomeContent:FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <div>
        <div className={`${styles.smallAdv} ${styles.topLeftAdv}`}>
          <Link href="/products/cameras">
            <a>
              <img src="/home-cameras.jpeg" alt="" />
              <p className={styles.advTitle}>Cameras</p>

            </a>
          </Link>
        </div>
        <div className={`${styles.smallAdv} ${styles.botLeftAdv}`}>
          <Link href="/products/mods">
            <a>
              <img src="/home-mods.jpeg" alt="" />
              <p className={styles.advTitle}>Mods</p>

            </a>
          </Link>
        </div>
      </div>
      <div className={styles.mainAdv}>
        <Link href="/products/cameras/gopro-9-black">
          <a><img src="/homehero9.jpg" alt="" /></a>
        </Link>
      </div>
      <div>
        <div className={`${styles.smallAdv} ${styles.topRightAdv}`}>
          <Link href="/products/protection">
            <a>
              <img src="/home-protection.jpg" alt="" />
              <p className={styles.advTitle}>Protection</p>

            </a>
          </Link>
        </div>
        <div className={`${styles.smallAdv} ${styles.botRightAdv}`}>
          <Link href="/products/mounts">
            <a>
              <img src="/home-mounts.jpg" alt="" />
              <p className={styles.advTitle}>Mounts</p>

            </a>
          </Link>
        </div>
      </div>
    </div>
    <div className={styles.videoSection}>
      <div className={styles.videoContainer}>
        <ReactPlayer url="https://www.youtube.com/watch?v=xYX6b1-9Coo" controls width="100%" height="100%" />
      </div>
    </div>
  </div>
)

export default HomeContent
