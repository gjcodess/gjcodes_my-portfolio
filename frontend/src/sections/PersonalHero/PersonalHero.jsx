import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { personalHeroData } from '../../data/personalContent';
import useMouseParallax from '../../hooks/useMouseParallax';
import styles from './PersonalHero.module.css';

function PersonalHero() {
  const contentRef = useRef(null);
  useMouseParallax(contentRef, 0.012);
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Typing word cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % personalHeroData.typingWords.length);
        setIsVisible(true);
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 1 });

    tl.fromTo(
      el.querySelector(`.${styles.greeting}`),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        el.querySelector(`.${styles.headline}`),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        el.querySelector(`.${styles.typingLine}`),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        el.querySelector(`.${styles.subtitle}`),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        el.querySelector(`.${styles.dividerLine}`),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        el.querySelector(`.${styles.scrollHint}`),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

    return () => tl.kill();
  }, []);

  return (
    <section className={styles.hero} id="personal-hero">
      {/* Ambient particles */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={styles.particle} />
        ))}
      </div>

      {/* Ambient glow orbs */}
      <div className={styles.ambientOrb1} aria-hidden="true" />
      <div className={styles.ambientOrb2} aria-hidden="true" />

      <div
        className={styles.content}
        ref={contentRef}
      >
        <span className={styles.greeting}>{personalHeroData.greeting}</span>

        <h1 className={styles.headline}>{personalHeroData.headline}</h1>

        <div className={styles.typingLine}>
          <span className={styles.typingLabel}>I am </span>
          <span
            className={`${styles.typingWord} ${isVisible ? styles.typingWordVisible : ''}`}
          >
            {personalHeroData.typingWords[wordIndex]}
          </span>
          <span className={styles.cursor}>_</span>
        </div>

        <p className={styles.subtitle}>{personalHeroData.subtitle}</p>

        <div className={styles.dividerLine} />

        <div className={styles.scrollHint}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollDot} />
          </div>
          <span>explore</span>
        </div>
      </div>
    </section>
  );
}

export default PersonalHero;
