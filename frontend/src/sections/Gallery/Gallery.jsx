import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryItems } from '../../data/personalContent';
import styles from './Gallery.module.css';

gsap.registerPlugin(ScrollTrigger);

const IMAGE_SIZES = [400, 800, 1200];
const FALLBACK_SIZE = 800;

const buildSrcSet = (base, ext) =>
  IMAGE_SIZES.map((size) => `/gallery/${base}-${size}.${ext} ${size}w`).join(', ');

const getSizes = (span) => {
  if (span === 'wide') {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw';
  }

  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
};

function GalleryItem({ item, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: index * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
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

  const spanClass =
    item.span === 'tall'
      ? styles.spanTall
      : item.span === 'wide'
        ? styles.spanWide
        : '';
  const hasImage = Boolean(item.imageBase);
  const sizes = getSizes(item.span);

  return (
    <div className={`${styles.item} ${spanClass}`} ref={ref}>
      <div className={styles.placeholder}>
        {hasImage ? (
          <picture className={styles.picture}>
            <source
              type="image/webp"
              srcSet={buildSrcSet(item.imageBase, 'webp')}
              sizes={sizes}
            />
            <img
              className={styles.image}
              src={`/gallery/${item.imageBase}-${FALLBACK_SIZE}.jpg`}
              srcSet={buildSrcSet(item.imageBase, 'jpg')}
              sizes={sizes}
              alt={item.title}
              loading="lazy"
              decoding="async"
            />
          </picture>
        ) : (
          <div className={styles.placeholderIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>
      <div className={styles.overlay}>
        <span className={styles.category}>{item.category}</span>
        <h3 className={styles.itemTitle}>{item.title}</h3>
      </div>
    </div>
  );
}

function Gallery() {
  const headerRef = useRef(null);

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

  return (
    <section className={styles.section} id="gallery">
      <div className={styles.inner}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.label}>// Gallery</span>
          <h2 className={styles.title}>Moments &<br />Memories</h2>
          <p className={styles.subtitle}>
            A visual journal — snapshots of life, travel, and everything in between.
          </p>
        </div>

        <div className={styles.grid}>
          {galleryItems.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
