import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMode } from '../../context/ModeContext';
import styles from './ModeTransition.module.css';

function ModeTransition() {
  const { isTransitioning } = useMode();
  const containerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const panels = containerRef.current.children;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Initially, hide panels out of view at the bottom (100% yPercent)
      gsap.set(panels, { yPercent: 100 });
      return;
    }

    if (isTransitioning) {
      // Entry phase: slide from bottom (100) to top (0)
      // Staggered right-to-left (from end to start)
      gsap.fromTo(
        panels,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.65,
          ease: 'power3.inOut',
          stagger: { amount: 0.2, from: 'end' }
        }
      );
    } else {
      // Exit phase: slide from top (0) to bottom (100)
      // Staggered right-to-left
      gsap.fromTo(
        panels,
        { yPercent: 0 },
        {
          yPercent: 100,
          duration: 0.45,
          ease: 'power3.inOut',
          stagger: { amount: 0.15, from: 'end' }
        }
      );
    }
  }, [isTransitioning]);

  return (
    <div className={styles.overlayContainer} ref={containerRef}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles.panel} />
      ))}
    </div>
  );
}

export default ModeTransition;
