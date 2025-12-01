import Link from 'next/link';
import styles from './milliways.module.css';
import { authClient } from '@/app/_utility/auth-client';

export default function MilliwaysNav() {
  const {
    data: session,
    isPending,
    error,
    refetch
  } = authClient.useSession();

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink} draggable="false">Home</Link>
        {!session ? <Link href='/signup' className={styles.navLink} draggable="false">Sign Up</Link> : null}
        {!session || error ? null : <Link href='/itineraries' className={styles.navLink} draggable="false">Itineraries</Link>}
      </nav>
    </div>
  )
}