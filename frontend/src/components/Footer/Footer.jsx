import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '../../utils/smoothScroll';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.brand}>
            gjcodes<span className={styles.brandDot}>.</span>
          </span>
          <span className={styles.copy}>
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        <div className={styles.right}>
          <span className={styles.builtWith}>
            Built with <span className={styles.react}>React</span> &amp; passion
          </span>
          <button
            className={styles.topBtn}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
