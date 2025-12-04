import { classNames } from '@/app/_utility/utilityFuncs';
import styles from './confirmation.module.css';

export default function Confirmation({ callback, toggleSelf }: { callback: () => void, toggleSelf: () => void }) {
  async function handleClick() {
    await callback();
    toggleSelf();
  }

  return (
    <div className={styles.confirmationOverlay}>
      <div className={styles.modalContainer}>
        <p>Are you sure you want to delete the itinerary?</p>
        <button type='button' onClick={handleClick} className={`globalButtonStyle ${styles.confirmButton}`}>Confirm</button>
        <button type='button' onClick={toggleSelf} className={`globalButtonStyle ${styles.cancelButton}`}>Cancel</button>
      </div>
    </div>
  )
}