import styles from './SectionWrapper.module.css';
import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * Section wrapper with consistent layout, optional header, and scroll reveal
 */
function SectionWrapper({
  id,
  label,
  title,
  subtitle,
  altBg = false,
  children,
  className = '',
}) {
  const headerRef = useScrollReveal({ direction: 'up', duration: 0.6 });

  return (
    <section
      id={id}
      className={`${styles.section} ${altBg ? styles.altBg : ''} ${className}`}
    >
      <div className={styles.inner}>
        {(label || title) && (
          <div className={styles.sectionHeader} ref={headerRef}>
            {label && <span className={styles.sectionLabel}>{label}</span>}
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}
            {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default SectionWrapper;
