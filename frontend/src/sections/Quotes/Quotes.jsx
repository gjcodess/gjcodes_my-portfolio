import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { quotes } from '../../data/personalContent';
import styles from './Quotes.module.css';

gsap.registerPlugin(ScrollTrigger);

function QuoteBlock({ quote, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [index]);

  return (
    <div className={styles.quoteBlock} ref={ref}>
      <div className={styles.quoteMark} aria-hidden="true">"</div>
      <blockquote className={styles.quoteText}>
        {quote.text}
      </blockquote>
      <cite className={styles.quoteAuthor}>— {quote.author}</cite>
    </div>
  );
}

function Quotes() {
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    const footerEl = footerRef.current;

    if (headerEl) {
      gsap.fromTo(
        headerEl,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerEl,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (footerEl) {
      gsap.fromTo(
        footerEl,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerEl,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    footerRef.current.style.setProperty('--mouse-x', `${x}px`);
    footerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className={styles.section} id="quotes">
      <div className={styles.inner}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.label}>// Philosophy</span>
          <h2 className={styles.title}>Words I Live By</h2>
        </div>

        <div className={styles.quotesList}>
          {quotes.map((quote, i) => (
            <QuoteBlock key={quote.id} quote={quote} index={i} />
          ))}
        </div>

        <div
          className={styles.thankYouCard}
          ref={footerRef}
          onMouseMove={handleMouseMove}
        >
          <div className={styles.ambientGlow} />
          <h2 className={styles.thankYouTitle}>
            <span className={styles.thankYouGradient}>THANK YOU</span>
            for visiting my profile.
          </h2>
          <div className={styles.cornerTopLeft} />
          <div className={styles.cornerBottomRight} />
        </div>
      </div>
    </section>
  );
}

export default Quotes;
