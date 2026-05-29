import { useEffect } from 'react';

/**
 * Custom hook for mouse-based parallax effect without re-rendering
 * @param {React.MutableRefObject} ref - Ref to the element to animate
 * @param {number} sensitivity - Movement sensitivity multiplier (default: 0.02)
 */
export function useMouseParallax(ref, sensitivity = 0.02) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = (e.clientX - centerX) * sensitivity;
      const y = (e.clientY - centerY) * sensitivity;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ref, sensitivity]);
}

export default useMouseParallax;
