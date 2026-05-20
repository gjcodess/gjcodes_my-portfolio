import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Camera, Gamepad2, Music, Cpu, Dumbbell, Plane, Bike,
} from 'lucide-react';
import { hobbies } from '../../data/personalContent';
import styles from './Hobbies.module.css';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Camera, Gamepad2, Music, Cpu, Dumbbell, Plane, Bike,
};

function HobbyCard({ hobby, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
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

  const IconComponent = iconMap[hobby.icon];

  return (
    <div
      className={styles.card}
      ref={cardRef}
      style={{ '--card-accent': hobby.accent }}
    >
      <div className={styles.cardIconWrapper}>
        {IconComponent && <IconComponent size={28} className={styles.cardIcon} />}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{hobby.title}</h3>
        <p className={styles.cardDescription}>{hobby.description}</p>
      </div>
      <div className={styles.cardIndex}>
        {String(hobby.id).padStart(2, '0')}
      </div>
      <div className={styles.cardGlow} aria-hidden="true" />
    </div>
  );
}

function Hobbies() {
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
    <section className={styles.section} id="hobbies">
      <div className={styles.inner}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.label}>// Hobbies</span>
          <h2 className={styles.title}>What I Do For Fun</h2>
          <p className={styles.subtitle}>
            Beyond the code — the things that fuel creativity and keep life interesting.
          </p>
        </div>

        <div className={styles.grid}>
          {hobbies.map((hobby, i) => (
            <HobbyCard key={hobby.id} hobby={hobby} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hobbies;
