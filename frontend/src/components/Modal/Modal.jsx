import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import styles from './Modal.module.css';

/**
 * Reusable modal component for displaying PDF documents (like resumes)
 * with built-in action headers (download, open in new tab) and mobile responsiveness.
 */
function Modal({ isOpen, onClose, pdfUrl, title = 'Curriculum Vitae', subtitle = 'Curriculum-Vitae_Corpus.pdf' }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = (e) => {
    // We let the natural click occur, but log or track if needed
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h2 id="modal-title" className={styles.title}>
              {title}
            </h2>
            <span className={styles.subtitle}>{subtitle}</span>
          </div>

          <div className={styles.headerActions}>
            {/* Open in New Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
              title="Open in new tab"
            >
              <ExternalLink size={16} />
              <span className={styles.actionText}>Open Tab</span>
            </a>

            {/* Download Button */}
            <a
              href={pdfUrl}
              download="Curriculum-Vitae_Corpus.pdf"
              className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
              onClick={handleDownload}
              title="Download PDF"
            >
              <Download size={16} />
              <span className={styles.actionText}>Download</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={styles.closeBtn}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Modal Body */}
        <div className={styles.body}>
          {/* Iframe for desktop PDF rendering */}
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            title="CV Resume Preview"
            className={styles.iframeContainer}
          />

          {/* Mobile Fallback: Iframe is hidden via CSS, this is shown */}
          <div className={styles.mobileFallback}>
            <div className={styles.fallbackIcon}>
              <FileText size={64} />
            </div>
            <div className={styles.fallbackText}>
              <h3>Curriculum Vitae</h3>
              <p>
                PDF preview is optimized for larger screens. Click below to download or open in new tab.
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <a
                href={pdfUrl}
                download="Curriculum-Vitae_Corpus.pdf"
                className={`${styles.fallbackBtn} ${styles.fallbackBtnPrimary}`}
              >
                <Download size={18} />
                <span>Download Resume</span>
              </a>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackBtn}
              >
                <ExternalLink size={18} />
                <span>Open in New Tab</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
