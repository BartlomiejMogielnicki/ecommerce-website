import { FC } from 'react'
import styles from './Map.module.scss'

const Map:FC = () => (
  <div className={styles.container}>
    <div>
      <iframe
        title="google map"
        width="100%"
        height="400"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14865.791985720853!2d55.46308823952987!3d-21.332817435823852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2182a0b8fc5c8adf%3A0xbef9be71353bb5a8!2sSaint%20Pierre%2C%20Reunion!5e0!3m2!1spl!2spl!4v1609324736565!5m2!1spl!2spl"
        frameBorder="0"
        scrolling="no"
      >
        <a
          href="https://www.mapsdirections.info/en/measure-map-radius/"
        >
          Map radius
          measure
        </a>
      </iframe>
    </div>
  </div>
)

export default Map
