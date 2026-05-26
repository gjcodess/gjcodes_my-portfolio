import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { personalInfo } from '../../data/content';
import useMouseParallax from '../../hooks/useMouseParallax';
import Button from '../../components/Button/Button';
import SocialLinks from '../../components/SocialLinks/SocialLinks';
import Modal from '../../components/Modal/Modal';
import styles from './Hero.module.css';

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef(null);
  const parallax = useMouseParallax(0.015);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 1 });

    tl.fromTo(
      el.querySelector(`.${styles.avatarWrapper}`),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
      .fromTo(
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
        style={{
          transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        }}
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

        {/* Right Side Avatar */}
        <div className={styles.avatarWrapper}>
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
