import { useRef, useEffect, useCallback, useState } from 'react';
import styles from './KineticGridBackground.module.css';


/**
 * KineticGridBackground
 *
 * An interactive full-viewport canvas grid whose intersections warp
 * toward the cursor. Grid lines near the cursor glow with a bright
 * highlight that fades with distance.
 *
 * @param {number}  gridSize          – spacing between grid lines in px (default 60)
 * @param {number}  interactionRadius – radius of cursor influence in px (default 200)
 * @param {number}  strength          – max displacement of intersections  (default 30)
 * @param {number}  damping           – spring damping factor 0→1 (default 0.15)
 * @param {string}  lineColor         – CSS color for grid lines (default 'rgba(0,255,153,0.06)')
 * @param {string}  highlightColor    – CSS color for highlighted lines near cursor (default 'rgba(0,255,153,0.7)')
 * @param {number}  lineWidth         – grid line width in px (default 1)
 * @param {number}  highlightLineWidth – line width for highlighted segments (default 1.5)
 * @param {boolean} disabled          – force-disable the effect entirely
 */
function KineticGridBackground({
  gridSize = 60,
  interactionRadius = 200,
  strength = 30,
  damping = 0.15,
  lineColor = 'rgba(0, 255, 153, 0.06)',
  highlightColor = 'rgba(0, 255, 153, 0.7)',
  lineWidth = 1,
  highlightLineWidth = 1.5,
  disabled = false,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const pointsRef = useRef([]);
  const dimsRef = useRef({ cols: 0, rows: 0, w: 0, h: 0 });

  // Influence multiplier: 1 = full effect, 0 = no effect.
  // Smoothly decays to 0 after touch release for a fade-out.
  const influenceRef = useRef(0);
  // Whether the user is actively interacting (mouse on screen or finger down)
  const activeRef = useRef(false);
  // Timestamp of last cursor/touch movement — used for idle fade on desktop
  const lastMoveRef = useRef(0);

  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    if (!disabled) {
      setIsStatic(false);
    } else {
      // Let the points spring back to rest over 1 second, then set isStatic to true
      const timer = setTimeout(() => {
        setIsStatic(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [disabled]);

  // ─── Initialise grid point arrays ───────────────────────────────
  const buildGrid = useCallback(() => {
    const { w, h } = dimsRef.current;
    // Add padding columns/rows so warped lines don't clip at edges
    const cols = Math.ceil(w / gridSize) + 4;
    const rows = Math.ceil(h / gridSize) + 4;
    dimsRef.current.cols = cols;
    dimsRef.current.rows = rows;

    const pts = new Array(cols * rows);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const ox = (c - 2) * gridSize;
        const oy = (r - 2) * gridSize;
        pts[i] = { ox, oy, x: ox, y: oy };
      }
    }
    pointsRef.current = pts;
  }, [gridSize]);

  // ─── Resize handler ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      dimsRef.current.w = w;
      dimsRef.current.h = h;
      buildGrid();

      if (disabled) {
        setIsStatic(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [buildGrid, disabled]);

  // ─── Input tracking ────────────────────────────────────────────
  useEffect(() => {
    if (disabled) return;

    // Browsers fire synthetic mousemove after touch — track last touch time
    // so we can ignore those fake mouse events.
    let lastTouchTime = 0;

    // Mouse (ignored if recently touched)
    const onMouseMove = (e) => {
      if (Date.now() - lastTouchTime < 500) return;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      activeRef.current = true;
      influenceRef.current = 1;
      lastMoveRef.current = Date.now();
    };
    const onMouseLeave = () => {
      if (Date.now() - lastTouchTime < 500) return;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      activeRef.current = false;
      influenceRef.current = 0; // instant for mouse — cursor leaves viewport
    };

    // Touch — keep last position on release so the fade-out radiates from there
    const onTouchStart = (e) => {
      lastTouchTime = Date.now();
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        activeRef.current = true;
        influenceRef.current = 1;
      }
    };
    const onTouchMove = (e) => {
      lastTouchTime = Date.now();
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        activeRef.current = true;
        influenceRef.current = 1;
      }
    };
    const onTouchEnd = () => {
      lastTouchTime = Date.now();
      // Don't reset mouse position — let the fade-out use the last touch point
      activeRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [disabled]);

  // ─── Animation loop ────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const radiusSq = interactionRadius * interactionRadius;
    // Highlight radius slightly larger than warp radius for a softer glow edge
    const hlRadius = interactionRadius * 1.3;
    // Rate at which influence decays per frame (~0.03 → fades over ~30 frames ≈ 0.5s)
    const fadeSpeed = 0.03;

    const tick = () => {
      const dpr = window.devicePixelRatio || 1;
      const { cols, rows } = dimsRef.current;
      const pts = pointsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // ── Idle check: if cursor hasn't moved for 1s, start fading ──
      if (activeRef.current && lastMoveRef.current > 0 && Date.now() - lastMoveRef.current > 100) {
        activeRef.current = false;
      }

      // ── Decay influence when not actively interacting ──
      if (!activeRef.current && influenceRef.current > 0) {
        influenceRef.current = Math.max(0, influenceRef.current - fadeSpeed);
      }
      const inf = influenceRef.current;

      // ── Update point positions (spring towards rest + cursor pull) ──
      for (let i = 0, len = pts.length; i < len; i++) {
        const p = pts[i];
        let tx = p.ox;
        let ty = p.oy;

        if (inf > 0 && !disabled) {
          const dx = mx - p.ox;
          const dy = my - p.oy;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / interactionRadius;
            const pull = factor * factor * factor * strength * inf;
            tx += (dx / dist) * pull;
            ty += (dy / dist) * pull;
          }
        }

        // Damped spring interpolation
        p.x += (tx - p.x) * damping;
        p.y += (ty - p.y) * damping;
      }

      // ── Draw ───────────────────────────────────────────────────────
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // --- Helper: trace entire grid as continuous paths ---
      const traceGrid = () => {
        // Horizontal lines (rows)
        for (let r = 0; r < rows; r++) {
          ctx.beginPath();
          for (let c = 0; c < cols; c++) {
            const p = pts[r * cols + c];
            if (c === 0) {
              ctx.moveTo(p.x, p.y);
            } else {
              const prev = pts[r * cols + c - 1];
              const cpx = (prev.x + p.x) / 2;
              const cpy = (prev.y + p.y) / 2;
              ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy);
            }
          }
          const last = pts[r * cols + cols - 1];
          ctx.lineTo(last.x, last.y);
          ctx.stroke();
        }

        // Vertical lines (columns)
        for (let c = 0; c < cols; c++) {
          ctx.beginPath();
          for (let r = 0; r < rows; r++) {
            const p = pts[r * cols + c];
            if (r === 0) {
              ctx.moveTo(p.x, p.y);
            } else {
              const prev = pts[(r - 1) * cols + c];
              const cpx = (prev.x + p.x) / 2;
              const cpy = (prev.y + p.y) / 2;
              ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy);
            }
          }
          const last = pts[(rows - 1) * cols + c];
          ctx.lineTo(last.x, last.y);
          ctx.stroke();
        }
      };

      // ── Pass 1: Base grid (always drawn) ──
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      traceGrid();

      // ── Pass 2: Highlight overlay (fades with influence) ──
      if (inf > 0.001 && mx > -9000 && my > -9000 && !disabled) {
        ctx.save();
        ctx.globalAlpha = inf;

        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, hlRadius);
        grad.addColorStop(0, highlightColor);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = highlightLineWidth;
        traceGrid();

        ctx.restore();
      }

      ctx.restore();

      if (!isStatic) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isStatic, disabled, interactionRadius, strength, damping, lineColor, lineWidth, highlightColor, highlightLineWidth]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.kineticGrid}
      aria-hidden="true"
    />
  );
}

export default KineticGridBackground;
