import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll-triggered reveal animations
 * @param {Object} options - Animation configuration
 * @param {string} options.direction - 'up' | 'down' | 'left' | 'right'
 * @param {number} options.delay - Animation delay in seconds
 * @param {number} options.duration - Animation duration in seconds
 * @param {number} options.distance - Distance to travel in pixels
 * @param {string} options.start - ScrollTrigger start position
 * @param {boolean} options.stagger - Whether to stagger children
 * @param {number} options.staggerAmount - Stagger delay between children
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  const {
    direction = 'up',
    delay = 0,
    duration = 0.8,
    distance = 40,
    start = 'top 85%',
    stagger = false,
    staggerAmount = 0.1,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const directionMap = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    const { x, y } = directionMap[direction] || directionMap.up;

    const targets = stagger ? el.children : el;

    gsap.set(targets, { opacity: 0, x, y });

    const animation = gsap.to(targets, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      stagger: stagger ? staggerAmount : 0,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction, delay, duration, distance, start, stagger, staggerAmount]);

  return ref;
}

export default useScrollReveal;
