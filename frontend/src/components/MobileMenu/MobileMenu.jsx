import { navLinks } from '../../data/content';
import { personalNavLinks } from '../../data/personalContent';
import { useMode } from '../../context/ModeContext';
import styles from './MobileMenu.module.css';

function MobileMenu({ isOpen, onClose, activeSection, onNavClick }) {
  const { mode } = useMode();
  const currentLinks = mode === 'personal' ? personalNavLinks : navLinks;

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {currentLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={`${styles.menuLink} ${activeSection === link.href.replace('#', '')
            ? styles.menuLinkActive
            : ''
            }`}
          onClick={(e) => onNavClick(e, link.href)}
        >
          {link.label}
        </a>
      ))}
      <span className={styles.menuFooter}>
        gjcodes • {mode === 'personal' ? 'Personal' : 'Portfolio'}
      </span>
    </div>
  );
}

export default MobileMenu;
