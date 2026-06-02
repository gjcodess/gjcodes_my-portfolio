import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMode } from '../../context/ModeContext';
import styles from './ModeSwitcher.module.css';

function ModeSwitcher() {
  const { mode, setMode } = useMode();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const isDetailPage = location.pathname.startsWith('/portfolio/projects/');

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDetailPage) return null;

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
        className={`${styles.option} ${mode === 'portfolio' ? styles.active : ''}`}
        onClick={() => setMode('portfolio')}
        role="tab"
        aria-selected={mode === 'portfolio'}
        aria-label="Portfolio mode"
      >
        Portfolio
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

