import logoSvg from '@shared/img/logo.svg'
import styles from './logo.module.css'
const Logo = () => {
  return (
    <picture className={styles.logo}>
      <img src={logoSvg} alt='tonstaker logo' />
    </picture>
  )
}

export default Logo
