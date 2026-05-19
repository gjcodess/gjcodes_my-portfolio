import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for mouse-based parallax effect
 * @param {number} sensitivity - Movement sensitivity multiplier (default: 0.02)
 * @returns {{ x: number, y: number }} - Offset values for CSS transforms
 */
export function useMouseParallax(sensitivity = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = (e.clientX - centerX) * sensitivity;
      const y = (e.clientY - centerY) * sensitivity;
      setOffset({ x, y });
    },
    [sensitivity]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return offset;
}

export default useMouseParallax;
