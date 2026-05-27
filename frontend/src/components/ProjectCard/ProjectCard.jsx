import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { projectDetails } from '../../data/projectDetails';
import styles from './ProjectCard.module.css';

const PROJECT_IMAGE_SIZES = [400, 800, 1200];
const FALLBACK_SIZE = 800;

const buildSrcSet = (base, ext) =>
  PROJECT_IMAGE_SIZES.map((size) => `/${base}-${size}.${ext} ${size}w`).join(', ');

const getSizes = () => '(max-width: 768px) 100vw, 50vw';

const isLinkAvailable = (url) => typeof url === 'string' && url.trim().length > 0;

const normalizeProjectImages = ({ imageBase, imageBases, image, images }) => {
  const sources = [];

  if (Array.isArray(imageBases)) {
    imageBases.filter(Boolean).forEach((base) => sources.push({ type: 'base', base }));
  }

  if (imageBase) {
    sources.push({ type: 'base', base: imageBase });
  }

  if (sources.length > 0) {
    return sources;
  }

  const legacyList = Array.isArray(images)
    ? images.filter(Boolean)
    : image
      ? [image]
      : [];

  return legacyList.map((src) => ({ type: 'url', src }));
};

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function LinkUnavailableModal({ linkType, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <p className={styles.modalText}>
          Sorry, there is no {linkType} link available for this project yet.
        </p>
        <button className={styles.modalClose} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

const getTechIcon = (tag) => {
  const normalized = tag.toLowerCase().trim();
  
  if (normalized === 'react' || normalized === 'react.js') {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="8" fill="#58C4DC" />
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#58C4DC" strokeWidth="3" transform="rotate(0 50 50)" />
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#58C4DC" strokeWidth="3" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#58C4DC" strokeWidth="3" transform="rotate(120 50 50)" />
      </svg>
    );
  }
  if (normalized === 'next.js' || normalized === 'next') {
    return (
      <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <circle cx="90" cy="90" r="90" fill="black" />
        <path d="M140.08 141.6L79.16 63.4H69.6v53.2h9.2V74.8l52.12 67.2c3.48-4 6.52-8.36 9.16-12.8" fill="white" />
        <path d="M117 63.4h9.2v53.2H117V63.4z" fill="white" />
      </svg>
    );
  }
  if (normalized === 'node.js' || normalized === 'node') {
    return (
      <div style={{ background: '#339933', color: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', borderRadius: '50%', fontFamily: 'var(--font-mono)' }}>JS</div>
    );
  }
  if (normalized === 'express' || normalized === 'express.js') {
    return (
      <div style={{ background: '#303030', color: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', borderRadius: '50%', fontFamily: 'var(--font-mono)' }}>ex</div>
    );
  }
  if (normalized === 'typescript' || normalized === 'ts') {
    return (
      <div style={{ background: '#3178C6', color: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', borderRadius: '50%' }}>TS</div>
    );
  }
  if (normalized === 'javascript' || normalized === 'js') {
    return (
      <div style={{ background: '#F7DF1E', color: 'black', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', borderRadius: '50%' }}>JS</div>
    );
  }
  if (normalized === 'css' || normalized === 'css3') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#264de4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '80%', height: '80%' }}>
        <path d="M2 2h20l-2 18-8 2-8-2z" fill="#264de4" />
        <path d="M12 5H6.5l.5 4.5h5zm0 9H8.5l-.2-2H12zm0-4.5h4.5l-.5 4.5L12 17v-3z" stroke="white" strokeWidth="1.5" />
      </svg>
    );
  }
  if (normalized === 'mysql') {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="48" fill="#00758F" />
        <g transform="translate(26, 26) scale(2)" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <ellipse cx="6" cy="3" rx="5" ry="2" />
          <path d="M1 3v8c0 1.1 2.2 2 5 2s5-.9 5-2V3" />
          <path d="M1 8c0 1.1 2.2 2 5 2s5-.9 5-2" />
        </g>
      </svg>
    );
  }
  if (normalized === 'figma') {
    return (
      <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '70%', height: '70%' }}>
        <path d="M19 0C10.7 0 4 6.7 4 15c0 8.3 6.7 15 15 15h19V15C38 6.7 31.3 0 19 0z" fill="#F24E1E"/>
        <path d="M4 30c0-8.3 6.7-15 15-15h19v30H19c-8.3 0-15-6.7-15-15z" fill="#A259FF"/>
        <path d="M4 45c0-8.3 6.7-15 15-15h19v15c0 8.3-6.7 15-15 15s-15-6.7-15-15z" fill="#1ABCFE"/>
        <path d="M19 30c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15V30H19z" fill="#0ACF83"/>
        <path d="M19 15c0-8.3 6.7-15 15-15s15 6.7 15 15-6.7 15-15 15-15-6.7-15-15z" fill="#FF7262"/>
      </svg>
    );
  }
  if (normalized === 'c language' || normalized === 'c') {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="48" fill="#3949AB" />
        <path d="M68 65C62.5 71 54.5 74 45 74C28.5 74 15 60.5 15 44C15 27.5 28.5 14 45 14C54.5 14 62.5 17 68 23L58.5 32.5C55.5 29.5 50.5 27.5 45 27.5C36 27.5 28.5 35 28.5 44C28.5 53 36 60.5 45 60.5C50.5 60.5 55.5 58.5 58.5 55.5L68 65Z" fill="white" />
      </svg>
    );
  }
  if (normalized === 'c++' || normalized === 'c++ language') {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="48" fill="#00599C" />
        <path d="M50 63C45.5 68 39 70.5 31.5 70.5C18.5 70.5 8 60 8 47C8 34 18.5 23.5 31.5 23.5C39 23.5 45.5 26 50 31L42.5 38.5C40 36 36 34.5 31.5 34.5C24.5 34.5 18.5 40.5 18.5 47C18.5 53.5 24.5 59.5 31.5 59.5C36 59.5 40 58 42.5 55.5L50 63Z" fill="white" />
        <path d="M63 43h-6v-6h-4v6h-6v4h6v6h4v-6h6v-4zM86 43h-6v-6h-4v6h-6v4h6v6h4v-6h6v-4z" fill="#00FF99" />
      </svg>
    );
  }
  if (normalized === 'n8n') {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="48" fill="#FF6D5A" />
        <circle cx="35" cy="50" r="10" fill="white" />
        <circle cx="65" cy="50" r="10" fill="white" />
        <path d="M35 50h30" stroke="white" strokeWidth="4" />
      </svg>
    );
  }
  if (normalized === 'vercel') {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="48" fill="black" />
        <polygon points="50,22 78,72 22,72" fill="white" />
      </svg>
    );
  }
  if (normalized === 'railway') {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="48" fill="#131415" />
        <path d="M25 30l25 40 25-40H25z" fill="#00FF99" />
        <path d="M35 30l15 24 15-24H35z" fill="#131415" />
      </svg>
    );
  }
  
  return (
    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-medium-gray)', textTransform: 'uppercase' }}>
      {tag.charAt(0)}
    </span>
  );
};

function ProjectCard({ project }) {
  const { title, description, tags, github, live, featured } = project;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [modalLinkType, setModalLinkType] = useState(null);
  const imageSources = normalizeProjectImages(project);
  const sizes = getSizes();
  const navigate = useNavigate();

  const hasGithub = isLinkAvailable(github);
  const hasLive = isLinkAvailable(live);

  // Find slug for the project (if it exists in projectDetails)
  const detailSlug = (projectDetails.find(
    (p) =>
      p.name.toLowerCase() === title.toLowerCase() ||
      (p.cardTitle && p.cardTitle.toLowerCase() === title.toLowerCase())
  ) || {}).id;

  useEffect(() => {
    if (imageSources.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % imageSources.length);
    }, 3500); // Change image every 3.5 seconds

    return () => clearInterval(interval);
  }, [imageSources.length]);

  const handleUnavailableLink = (e, type) => {
    e.preventDefault();
    setModalLinkType(type);
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on links or buttons inside the card
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (detailSlug) {
      sessionStorage.setItem('portfolio_scroll_pos', window.scrollY);
      navigate(`/portfolio/projects/${detailSlug}`);
    }
  };

  return (
    <div className={styles.projectCardWrapper}>
      <article
        className={`${styles.projectCard} ${detailSlug ? styles.clickable : ''}`}
        onClick={handleCardClick}
        role={detailSlug ? 'link' : undefined}
        tabIndex={detailSlug ? 0 : undefined}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && detailSlug) {
            e.preventDefault();
            navigate(`/portfolio/projects/${detailSlug}`);
          }
        }}
      >
        {/* Floating Type Pill on Hover */}
        {project.type && (
          <div className={styles.typePopup}>
            <span className={styles.typeText}>{project.type}</span>
            <div className={styles.typeLine} />
          </div>
        )}
        {/* Inner Container to clip the glare effect and apply rounded corners */}
        <div className={styles.cardInner}>
          {/* Image / Slideshow */}
          <div className={styles.imageArea}>
            {imageSources.length > 0 ? (
              <>
                {imageSources.map((source, idx) => {
                  const isActive = idx === currentIdx;
                  const imgClassName = `${styles.projectImg} ${isActive ? styles.projectImgActive : ''}`;
                  const altText = `${title} screenshot ${idx + 1}`;

                  if (source.type === 'base') {
                    return (
                      <picture key={`${source.base}-${idx}`} className={styles.projectPicture}>
                        <source
                          type="image/webp"
                          srcSet={buildSrcSet(source.base, 'webp')}
                          sizes={sizes}
                        />
                        <img
                          src={`/${source.base}-${FALLBACK_SIZE}.jpg`}
                          srcSet={buildSrcSet(source.base, 'jpg')}
                          sizes={sizes}
                          alt={altText}
                          className={imgClassName}
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    );
                  }

                  return (
                    <img
                      key={`${source.src}-${idx}`}
                      src={source.src}
                      alt={altText}
                      className={imgClassName}
                      loading="lazy"
                      decoding="async"
                    />
                  );
                })}

                {/* Navigation Dots if multiple images */}
                {imageSources.length > 1 && (
                  <div className={styles.dotsContainer}>
                    {imageSources.map((_, idx) => (
                      <span
                        key={idx}
                        className={`${styles.dot} ${idx === currentIdx ? styles.dotActive : ''
                          }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <span className={styles.imagePlaceholder}>{title.charAt(0)}</span>
            )}
          </div>

          {/* Content */}
          <div className={styles.content}>
            {featured && <span className={styles.featured}>Featured</span>}
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>

            {/* Footer Area with tech badges and action links */}
            <div className={styles.cardFooter}>
              {/* Tech Badges */}
              {tags && tags.length > 0 && (
                <div className={styles.techBadges}>
                  {tags.slice(0, 5).map((tag, idx) => (
                    <div key={`${tag}-${idx}`} className={styles.techBadgeCircle} title={tag}>
                      {getTechIcon(tag)}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Links */}
              <div className={styles.actionLinks}>
                {detailSlug && (
                  <button
                    className={styles.detailCircleBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      sessionStorage.setItem('portfolio_scroll_pos', window.scrollY);
                      navigate(`/portfolio/projects/${detailSlug}`);
                    }}
                    title="View Project Details"
                    aria-label="View details"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Link Unavailable Modal */}
        {modalLinkType && (
          <LinkUnavailableModal
            linkType={modalLinkType}
            onClose={() => setModalLinkType(null)}
          />
        )}
      </article>
    </div>
  );
}

export default ProjectCard;
