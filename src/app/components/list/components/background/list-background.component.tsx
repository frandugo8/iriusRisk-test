
import styles from './list-background.module.scss';

export default function ListBackgroundComponent() {
  return (
    <div className={styles.background}>
      {[...Array(100)].map((_, index: number) => 
        <div key={index} className={`${styles.dotWrapper} ${styles[`dotWrapper__${index + 1}`]}`}>
          <div className={`${styles.dot} ${styles[`dot__${index + 1}`]}`}></div>
        </div>
      )}
    </div>
  );
}