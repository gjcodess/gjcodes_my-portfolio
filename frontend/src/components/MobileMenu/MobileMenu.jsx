import { navLinks } from '../../data/content';
import styles from './MobileMenu.module.css';

function MobileMenu({ isOpen, onClose, activeSection, onNavClick }) {
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={`${styles.menuLink} ${
            activeSection === link.href.replace('#', '')
              ? styles.menuLinkActive
              : ''
          }`}
          onClick={(e) => onNavClick(e, link.href)}
        >
          {link.label}
        </a>
      ))}
      <span className={styles.menuFooter}>Glenn • Portfolio</span>
    </div>
  );
}

export default MobileMenu;
