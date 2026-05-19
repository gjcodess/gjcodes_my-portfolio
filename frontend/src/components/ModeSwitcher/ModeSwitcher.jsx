import { useState, useEffect } from 'react';
import { useMode } from '../../context/ModeContext';
import styles from './ModeSwitcher.module.css';

function ModeSwitcher() {
  const { mode, setMode } = useMode();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`${styles.switcher} ${visible ? styles.visible : styles.hidden}`}
      role="tablist"
      aria-label="Portfolio mode"
    >
      <div
        className={styles.indicator}
        style={{
          transform: mode === 'personal' ? 'translateX(100%)' : 'translateX(0)',
        }}
      />
      <button
        className={`${styles.option} ${mode === 'corporate' ? styles.active : ''}`}
        onClick={() => setMode('corporate')}
        role="tab"
        aria-selected={mode === 'corporate'}
        aria-label="Corporate mode"
      >
        Corporate
      </button>
      <button
        className={`${styles.option} ${mode === 'personal' ? styles.active : ''}`}
        onClick={() => setMode('personal')}
        role="tab"
        aria-selected={mode === 'personal'}
        aria-label="Personal mode"
      >
        Personal
      </button>

    </div>
  );
}

export default ModeSwitcher;

