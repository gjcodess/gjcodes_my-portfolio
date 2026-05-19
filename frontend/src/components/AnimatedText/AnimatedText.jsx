import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './AnimatedText.module.css';

/**
 * AnimatedText — Reveals text word by word with GSAP
 * @param {string} text - The text to animate
 * @param {string} tag - HTML element to render (default: 'div')
 * @param {number} delay - Initial delay in seconds
 * @param {number} stagger - Stagger between words
 * @param {string} className - Additional class
 */
function AnimatedText({
  text,
  tag: Tag = 'div',
  delay = 0,
  stagger = 0.05,
  className = '',
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const words = containerRef.current?.querySelectorAll(`.${styles.word}`);
    if (!words?.length) return;

    gsap.fromTo(
      words,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        stagger,
        ease: 'power3.out',
      }
    );
  }, [delay, stagger, text]);

  const words = text.split(' ');

  return (
    <Tag
      ref={containerRef}
      className={`${styles.wrapper} ${className}`}
      {...props}
    >
      {words.map((word, i) => (
        <span key={i} className={styles.word}>
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}

export default AnimatedText;
