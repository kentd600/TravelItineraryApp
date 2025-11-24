import styles from './WandererLoading.module.css'

export default function Loading() {
  return (
    <div className={styles.spinnerContainer}>
      <span className={styles.loader}></span>
    </div>
  )
}