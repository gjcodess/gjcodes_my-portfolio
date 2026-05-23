import { useState, useEffect, useCallback } from 'react';
import { navLinks } from '../../data/content';
import { personalNavLinks } from '../../data/personalContent';
import { useMode } from '../../context/ModeContext';
import { scrollToSection, scrollToTop } from '../../utils/smoothScroll';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Navbar.module.css';

function Navbar() {
  const { mode } = useMode();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const currentLinks = mode === 'personal' ? personalNavLinks : navLinks;

  // Track scroll position for nav background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    setActiveSection('');

    const sections = currentLinks.map((link) =>
      document.getElementById(link.href.replace('#', ''))
    ).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [mode, currentLinks]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
    setMenuOpen(false);
  }, []);

  // Close menu on mode switch
  useEffect(() => {
    setMenuOpen(false);
  }, [mode]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="Go to top"
        >
          gjcodes<span className={styles.logoDot}>.</span>
        </a>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          {currentLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${activeSection === link.href.replace('#', '')
                  ? styles.navLinkActive
                  : ''
                }`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
    </>
  );
}

export default Navbar;
