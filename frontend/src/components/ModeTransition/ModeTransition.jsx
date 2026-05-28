import { useMode } from '../../context/ModeContext';
import styles from './ModeTransition.module.css';

function ModeTransition() {
  const { isTransitioning } = useMode();

  return (
    <div className={`${styles.overlayContainer} ${isTransitioning ? styles.active : ''}`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles.panel} />
      ))}
    </div>
  );
}

export default ModeTransition;
