import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { lifeComponents } from '../../data/personalContent';
import styles from './LifeComponents.module.css';

gsap.registerPlugin(ScrollTrigger);

function LifeModal({ item, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: 'power3.out' }
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  }, [onClose]);

  return (
    <div
      className={styles.modalOverlay}
      ref={overlayRef}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className={styles.modalContent}
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modalClose}
          onClick={handleClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <span className={styles.modalLabel}>// Components of Life</span>
        <h2 className={styles.modalTitle}>{item.title}</h2>
        <div className={styles.modalDivider} />
        <p className={styles.modalDescription}>{item.description}</p>

        <div className={styles.modalFooter}>
          <span className={styles.modalIndex}>
            {String(item.id).padStart(2, '0')} / {String(lifeComponents.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}

function LifeComponents() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);

  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Reveal header
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  // Stagger card reveals
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(`.${styles.card}`);

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  // Auto-scroll loop back and forth
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId;
    let direction = 1; // 1 for right, -1 for left
    const speed = 0.4; // smooth slow drift

    const animate = () => {
      if (!isDraggingRef.current && !isHoveredRef.current) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0) {
          let nextScroll = container.scrollLeft + direction * speed;
          if (nextScroll >= maxScroll) {
            nextScroll = maxScroll;
            direction = -1; // Reverse direction
          } else if (nextScroll <= 0) {
            nextScroll = 0;
            direction = 1; // Reverse direction
          }
          container.scrollLeft = nextScroll;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Drag Scroll Event Handlers
  const handleMouseDown = (e) => {
    const container = scrollRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false; // Reset on new drag start
    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = container.scrollLeft;
    container.style.scrollBehavior = 'auto'; // Instant scroll update while dragging
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const container = scrollRef.current;
    if (!container) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 5) {
      hasDraggedRef.current = true; // Mark as drag only if moved significantly
    }
    container.scrollLeft = dragStartScrollLeftRef.current - dx;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    const container = scrollRef.current;
    if (container) {
      container.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    isHoveredRef.current = false;
    const container = scrollRef.current;
    if (container) {
      container.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleTouchStart = () => {
    isDraggingRef.current = true;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleCardClick = (e, item) => {
    // If the drag event flagged a scroll, do not trigger the details popup
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false; // Reset flag
      return;
    }
    setActiveItem(item);
  };

  return (
    <section className={styles.section} id="life-components" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.label}>// Components of Life</span>
          <h2 className={styles.title}>The Pieces That Make Me</h2>
          <p className={styles.subtitle}>
            Aspects of life that shape who I am — scroll or drag to explore.
          </p>
        </div>

        <div
          className={styles.scrollContainer}
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.scrollTrack}>
            {lifeComponents.map((item) => (
              <div
                key={item.id}
                className={styles.card}
                style={{ background: item.gradient }}
                onClick={(e) => handleCardClick(e, item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setActiveItem(item);
                }}
              >
                <span className={styles.cardIndex}>
                  {String(item.id).padStart(2, '0')}
                </span>
                <div className={styles.cardBottom}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className={styles.cardArrow}>→</span>
                </div>
                <div className={styles.cardBorder} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.scrollIndicator} aria-hidden="true">
          <div className={styles.scrollLine} />
          <span>Drag horizontally</span>
        </div>
      </div>

      {activeItem && (
        <LifeModal item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </section>
  );
}

export default LifeComponents;
