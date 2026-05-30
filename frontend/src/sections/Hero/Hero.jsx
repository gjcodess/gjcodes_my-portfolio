import { useState, useEffect, useRef, useCallback } from 'react';
import { Application } from '@splinetool/runtime';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { personalInfo } from '../../data/content';
import Button from '../../components/Button/Button';
import SocialLinks from '../../components/SocialLinks/SocialLinks';
import Modal from '../../components/Modal/Modal';
import styles from './Hero.module.css';

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(min-width: 1025px)').matches;
    }
    return false;
  });
  const [show3D, setShow3D] = useState(false);
  const [is3DLoading, setIs3DLoading] = useState(true);
  const contentRef = useRef(null);
  const splineAppRef = useRef(null);
  const cleanupRef = useRef(null);

  // Check if we are on desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1025px)');
    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Cleanup Spline when switching away from desktop mode
  useEffect(() => {
    if (!isDesktop) {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    }
  }, [isDesktop]);

  // useCallback ref: fires when the canvas element mounts/unmounts
  const canvasRef = useCallback((canvas) => {
    // Cleanup previous instance if any
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (!canvas) return; // canvas unmounted

    let app = null;
    let cancelled = false;
    let transitionTimeout = null;

    const isDescendant = (parent, target) => {
      if (!parent || !target) return false;
      if (
        parent.id === target.id ||
        (parent.name && target.name && parent.name === target.name)
      ) {
        return true;
      }
      if (parent.children && parent.children.length > 0) {
        for (const child of parent.children) {
          if (isDescendant(child, target)) return true;
        }
      }
      return false;
    };

    const isEnterBtn = (obj) => {
      if (!obj) return false;
      const name = (obj.name || '').toLowerCase();
      if (
        name === 'enter-btn' ||
        name.includes('enter') ||
        name === 'cube 9' ||
        name === 'icons8-forward-arrow-96'
      ) {
        return true;
      }

      if (app) {
        const enterBtn = app.findObjectByName('enter-btn');
        if (enterBtn && isDescendant(enterBtn, obj)) return true;
      }

      // Fallback parent traversal
      let current = obj;
      while (current) {
        const name = (current.name || '').toLowerCase();
        if (
          name === 'enter-btn' ||
          name.includes('enter') ||
          name === 'cube 9' ||
          name === 'icons8-forward-arrow-96'
        ) {
          return true;
        }
        current = current.parent;
      }
      return false;
    };

    const handleSplineMouseDown = (e) => {
      if (!e.target) return;
      console.log('[Spline] mouseDown object:', e.target.name, e.target.id);
      
      // Print hierarchy for debugging
      let path = [];
      let cur = e.target;
      while (cur) {
        path.push(`${cur.name || 'unnamed'} (${cur.type || 'Object3D'})`);
        cur = cur.parent;
      }
      console.log('[Spline] Click hierarchy:', path.join(' -> '));

      if (isEnterBtn(e.target)) {
        if (transitionTimeout) clearTimeout(transitionTimeout);
        transitionTimeout = setTimeout(() => {
          setShow3D(false);
        }, 500); // 500ms delay to let the keypress animation play out
      }
    };

    const preventWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    canvas.addEventListener('wheel', preventWheel, { capture: true, passive: false });

    // Prevent middle click (scroll button) dragging/panning/orbiting
    const preventMiddleClick = (e) => {
      if (e.button === 1 || (e.buttons & 4)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    canvas.addEventListener('mousedown', preventMiddleClick, { capture: true });
    canvas.addEventListener('mouseup', preventMiddleClick, { capture: true });
    canvas.addEventListener('mousemove', preventMiddleClick, { capture: true });
    canvas.addEventListener('pointerdown', preventMiddleClick, { capture: true });
    canvas.addEventListener('pointerup', preventMiddleClick, { capture: true });
    canvas.addEventListener('pointermove', preventMiddleClick, { capture: true });

    // Prevent multi-touch zoom/pan
    const preventMultiTouch = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    canvas.addEventListener('touchstart', preventMultiTouch, { capture: true, passive: false });
    canvas.addEventListener('touchmove', preventMultiTouch, { capture: true, passive: false });

    const initSpline = async () => {
      try {
        // ⚠️ Critical: set canvas pixel dimensions to match its CSS size
        // Default canvas is 300×150 — this causes raycasting misses
        const wrapper = canvas.parentElement;
        const w = wrapper ? wrapper.offsetWidth : 650;
        const h = wrapper ? wrapper.offsetHeight : 650;
        canvas.width = w;
        canvas.height = h;
        console.log(`[Spline] Canvas set to ${w}×${h}px`);

        app = new Application(canvas);
        splineAppRef.current = app;
        await app.load('https://prod.spline.design/dIei1GwXDuVMhVV4/scene.splinecode');

        if (cancelled) { app.dispose(); return; }

        // Sync size after load in case runtime resized internally
        app.setSize(w, h);

        // Log all objects to verify exact names
        if (typeof app.getAllObjects === 'function') {
          const objs = app.getAllObjects();
          console.log('[Spline] All objects:', objs.map(o => o.name));
          const btn = objs.find(o => o.name === 'enter-btn');
          console.log('[Spline] enter-btn found:', !!btn);
        }

        app.addEventListener('mouseDown', handleSplineMouseDown);
        app.addEventListener('mousePress', handleSplineMouseDown);
        setIs3DLoading(false);
        console.log('[Spline] ✅ Scene loaded & listeners attached');
      } catch (err) {
        console.error('[Spline] ❌ Load error:', err);
        setIs3DLoading(false);
      }
    };

    initSpline();

    // Store cleanup
    cleanupRef.current = () => {
      cancelled = true;
      if (transitionTimeout) clearTimeout(transitionTimeout);
      canvas.removeEventListener('wheel', preventWheel, { capture: true });
      canvas.removeEventListener('mousedown', preventMiddleClick, { capture: true });
      canvas.removeEventListener('mouseup', preventMiddleClick, { capture: true });
      canvas.removeEventListener('mousemove', preventMiddleClick, { capture: true });
      canvas.removeEventListener('pointerdown', preventMiddleClick, { capture: true });
      canvas.removeEventListener('pointerup', preventMiddleClick, { capture: true });
      canvas.removeEventListener('pointermove', preventMiddleClick, { capture: true });
      canvas.removeEventListener('touchstart', preventMultiTouch, { capture: true });
      canvas.removeEventListener('touchmove', preventMultiTouch, { capture: true });
      if (app) {
        app.removeEventListener('mouseDown', handleSplineMouseDown);
        app.removeEventListener('mousePress', handleSplineMouseDown);
        app.dispose();
      }
      splineAppRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 1 });

    const visualEl = el.querySelector(`.${styles.visualWrapper}`);
    if (visualEl) {
      tl.fromTo(
        visualEl,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
      );
    }

    tl.fromTo(
      el.querySelector(`.${styles.roleBadge}`),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
      .fromTo(
        el.querySelector(`.${styles.headingGreet}`),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        el.querySelector(`.${styles.headingName}`),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        el.querySelector(`.${styles.tagline}`),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        el.querySelector(`.${styles.ctaGroup}`),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        el.querySelector(`.${styles.socialArea}`),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

    return () => tl.kill();
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* Floating Particles */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className={styles.particle} />
        ))}
      </div>

      {/* Hero Content */}
      <div
        className={styles.heroContent}
        ref={contentRef}
      >
        {/* Left Side Text Content */}
        <div className={styles.textContent}>
          {/* Role Badge */}
          <span className={styles.roleBadge}>{personalInfo.role}</span>

          {/* Heading */}
          <div className={styles.heading}>
            <h1 className={styles.headingGreet}>Hello, I'm</h1>
            <h2 className={styles.headingName}>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Glenn Joshua</span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Corpus</span>
            </h2>
          </div>

          {/* Tagline */}
          <p className={styles.tagline}>{personalInfo.tagline}</p>

          {/* Actions & Socials */}
          <div className={styles.bottomRow}>
            <div className={styles.ctaGroup}>
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
                icon={ArrowRight}
              >
                VIEW CV
              </Button>
            </div>
            <div className={styles.socialArea}>
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Right Side Visuals (Avatar or 3D) */}
        <div className={styles.visualContainer}>
          <div className={styles.visualWrapper}>
            {/* 3D Keyboard Scene (Desktop only) */}
            {isDesktop && (
              <div
                className={`${styles.splineWrapper} ${
                  show3D ? styles.visualActive : styles.visualInactive
                }`}
              >
                {is3DLoading && (
                  <div className={styles.loaderContainer}>
                    <div className={styles.loaderRing}></div>
                    <span className={styles.loaderText}>Loading 3D Scene</span>
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    opacity: is3DLoading ? 0 : 1,
                    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'block',
                  }}
                />
              </div>
            )}

            {/* 2D Profile Avatar */}
            <div
              className={`${styles.avatarWrapper} ${
                !show3D || !isDesktop ? styles.visualActive : styles.visualInactive
              } ${!isDesktop ? styles.avatarDisabled : ''}`}
              onClick={isDesktop ? () => setShow3D(true) : undefined}
              role={isDesktop ? 'button' : undefined}
              tabIndex={isDesktop ? 0 : -1}
              onKeyDown={
                isDesktop
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setShow3D(true);
                      }
                    }
                  : undefined
              }
            >
              <div className={styles.avatarRingOuter} />
              <div className={styles.avatarRingInner} />
              <div className={styles.avatarCircle}>
                {personalInfo.avatar ? (
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className={styles.avatarImg}
                  />
                ) : (
                  <span className={styles.avatarInitials}>
                    {personalInfo.name.charAt(0)}
                  </span>
                )}
                {/* Hover Badge */}
                {isDesktop && (
                  <div className={styles.hoverBadge}>
                    <span>CLICK ME ⌨️</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollMouse}>
          <div className={styles.scrollDot} />
        </div>
        <span>scroll</span>
      </div>

      {/* CV Resume Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfUrl={personalInfo.resumeUrl}
        title="Curriculum Vitae"
        subtitle="Resume-Glenn.pdf"
      />
    </section>
  );
}

export default Hero;
