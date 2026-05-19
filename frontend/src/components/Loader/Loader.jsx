import { useState, useEffect } from 'react';
import styles from './Loader.module.css';

function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.loaderOverlay} ${hidden ? styles.loaderHidden : ''}`}
      aria-hidden={hidden}
    >
      <div className={styles.loaderLogo}>
        G<span className={styles.loaderDot}>.</span>
      </div>
      <div className={styles.loaderBar}>
        <div className={styles.loaderProgress} />
      </div>
    </div>
  );
}

export default Loader;
