import Link from 'next/link';
import styles from './milliways.module.css';

export default function MilliwaysNav() {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink} draggable="false">Home</Link>
        <Link href='/about' className={styles.navLink} draggable="false">About</Link>
      </nav>
    </div>
  )
}