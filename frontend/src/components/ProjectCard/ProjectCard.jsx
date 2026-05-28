import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { projectDetails } from '../../data/projectDetails';
import { useMode } from '../../context/ModeContext';
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
  
  const deviconPaths = {
    'react': 'react/react-original.svg',
    'react.js': 'react/react-original.svg',
    'next.js': 'nextjs/nextjs-original.svg',
    'next': 'nextjs/nextjs-original.svg',
    'node.js': 'nodejs/nodejs-original.svg',
    'node': 'nodejs/nodejs-original.svg',
    'express': 'express/express-original.svg',
    'express.js': 'express/express-original.svg',
    'typescript': 'typescript/typescript-original.svg',
    'ts': 'typescript/typescript-original.svg',
    'javascript': 'javascript/javascript-original.svg',
    'js': 'javascript/javascript-original.svg',
    'css': 'css3/css3-original.svg',
    'css3': 'css3/css3-original.svg',
    'html': 'html5/html5-original.svg',
    'html5': 'html5/html5-original.svg',
    'mysql': 'mysql/mysql-original.svg',
    'figma': 'figma/figma-original.svg',
    'c++': 'cplusplus/cplusplus-original.svg',
    'c++ language': 'cplusplus/cplusplus-original.svg',
    'python': 'python/python-original.svg',
    'java': 'java/java-original.svg',
    'bootstrap': 'bootstrap/bootstrap-original.svg',
  };

  const path = deviconPaths[normalized];
  if (path) {
    return (
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`}
        alt={`${tag} logo`}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        loading="lazy"
      />
    );
  }

  if (normalized === 'n8n') {
    return (
      <svg viewBox="0 121.3 512.1 269.6" xmlns="http://www.w3.org/2000/svg" style={{ width: '85%', height: '85%' }}>
        <path 
          d="M458.1 229.1c-25.1 0-46.2-17.2-52.2-40.4h-61.8c-13.2 0-24.4 9.5-26.6 22.5l-2.2 13.3c-2 12.2-8.2 23.4-17.5 31.6 9.3 8.2 15.5 19.3 17.5 31.6l2.2 13.3c2.2 13 13.4 22.5 26.6 22.5h7.9c6-23.2 27.1-40.4 52.2-40.4 29.8 0 53.9 24.1 53.9 53.9s-24.1 53.9-53.9 53.9c-25.1 0-46.2-17.2-52.2-40.4h-7.9c-26.3 0-48.8-19-53.2-45l-2.2-13.3c-2.2-13-13.4-22.5-26.6-22.5h-21.4c-6 23.2-27.1 40.4-52.2 40.4s-46.2-17.2-52.2-40.4H106c-6 23.2-27.1 40.4-52.2 40.4C24.1 309.9 0 285.8 0 256s24.1-53.9 53.9-53.9c25.1 0 46.2 17.2 52.2 40.4h30.3c6-23.2 27.1-40.4 52.2-40.4s46.2 17.2 52.2 40.4h21.4c13.2 0 24.4-9.5 26.6-22.5l2.2-13.3c4.3-26 26.8-45 53.2-45H406c6-23.2 27.1-40.4 52.2-40.4 29.8 0 53.9 24.1 53.9 53.9s-24.2 53.9-54 53.9m0-27c14.9 0 26.9-12.1 26.9-26.9s-12.1-26.9-26.9-26.9-26.9 12.1-26.9 26.9 12 26.9 26.9 26.9M53.9 282.9c14.9 0 26.9-12.1 26.9-26.9s-12.1-26.9-26.9-26.9-27 12-27 26.9 12.1 26.9 27 26.9M215.6 256c0 14.9-12.1 26.9-26.9 26.9s-26.9-12.1-26.9-26.9 12.1-26.9 26.9-26.9 26.9 12 26.9 26.9m215.6 80.8c0 14.9-12.1 26.9-26.9 26.9-14.9 0-26.9-12.1-26.9-26.9s12.1-26.9 26.9-26.9 26.9 12.1 26.9 26.9" 
          fill="#ea4b71" 
          fillRule="evenodd" 
          clipRule="evenodd" 
        />
      </svg>
    );
  }

  if (normalized === 'c' || normalized === 'c language') {
    return (
      <svg viewBox="0 0 38.000089 42.000031" xmlns="http://www.w3.org/2000/svg" style={{ width: '85%', height: '85%' }}>
        <path
          fill="#004482"
          fillRule="evenodd"
          d="m 17.903,0.28628166 c 0.679,-0.381 1.515,-0.381 2.193,0 C 23.451,2.1692817 33.547,7.8372817 36.903,9.7202817 37.582,10.100282 38,10.804282 38,11.566282 c 0,3.766 0,15.101 0,18.867 0,0.762 -0.418,1.466 -1.097,1.847 -3.355,1.883 -13.451,7.551 -16.807,9.434 -0.679,0.381 -1.515,0.381 -2.193,0 -3.355,-1.883 -13.451,-7.551 -16.807,-9.434 -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 0,-3.766 0,-15.101 0,-18.867 0,-0.762 0.418,-1.466 1.097,-1.8470003 3.354,-1.883 13.452,-7.551 16.806,-9.43400004 z"
          clipRule="evenodd"
        />
        <path
          fill="#659ad2"
          fillRule="evenodd"
          d="m 0.304,31.404282 c -0.266,-0.356 -0.304,-0.694 -0.304,-1.149 0,-3.744 0,-15.014 0,-18.759 0,-0.758 0.417,-1.458 1.094,-1.8360003 3.343,-1.872 13.405,-7.507 16.748,-9.38000004 0.677,-0.379 1.594,-0.371 2.271,0.008 3.343,1.87200004 13.371,7.45900004 16.714,9.33100004 0.27,0.152 0.476,0.335 0.66,0.5760003 z"
          clipRule="evenodd"
        />
        <path
          fill="#ffffff"
          fillRule="evenodd"
          d="m 19,7.0002817 c 7.727,0 14,6.2730003 14,14.0000003 0,7.727 -6.273,14 -14,14 -7.727,0 -14,-6.273 -14,-14 0,-7.727 6.273,-14.0000003 14,-14.0000003 z m 0,7.0000003 c 3.863,0 7,3.136 7,7 0,3.863 -3.137,7 -7,7 -3.863,0 -7,-3.137 -7,-7 0,-3.864 3.136,-7 7,-7 z"
          clipRule="evenodd"
        />
        <path
          fill="#00599c"
          fillRule="evenodd"
          d="m 37.485,10.205282 c 0.516,0.483 0.506,1.211 0.506,1.784 0,3.795 -0.032,14.589 0.009,18.384 0.004,0.396 -0.127,0.813 -0.323,1.127 l -19.084,-10.5 z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  if (normalized === 'vercel') {
    return (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style={{ width: '85%', height: '85%' }}>
        <circle cx="256" cy="256" r="256" fill="#000000" />
        <polygon points="256,130 396,366 116,366" fill="#ffffff" stroke="#ffffff" strokeWidth="30" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalized === 'railway') {
    return (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" style={{ width: '85%', height: '85%' }}>
        <path d="M2.368 219.093A260.486 260.486 0 000 244.864h388.907a44.635 44.635 0 00-5.035-7.381c-66.475-85.888-102.25-78.443-153.387-80.64-17.066-.683-28.65-.982-96.533-.982-36.352 0-75.84.107-114.325.214-4.971 13.44-9.771 26.453-12.118 37.056h199.296v25.962H2.347h.021zm389.59 51.755H.213c.427 6.933 1.067 13.76 2.006 20.501h361.685c16.128 0 25.152-9.152 28.075-20.48l-.021-.02zM22.507 362.155S82.453 509.398 255.723 512c103.552 0 192.533-61.504 232.96-149.845H22.507z" fill="#ffffff" />
        <path d="M255.723 0C160 0 76.65 52.587 32.66 130.304c34.368-.064 101.334-.107 101.334-.107h.021v-.02c79.147 0 82.09.34 97.557.98l9.6.363c33.323 1.11 74.326 4.693 106.582 29.099 17.493 13.226 42.773 42.453 57.856 63.253 13.93 19.243 17.92 41.387 8.448 62.592-8.704 19.477-27.456 31.104-50.176 31.104H8.32s2.133 8.96 5.29 18.88h485.334c8.619-25.92 12.992-53.035 13.014-80.341C512 114.667 397.29 0 255.744 0h-.021z" fill="#ffffff" />
      </svg>
    );
  }

  if (normalized === 'c' || normalized === 'c language') {
    return (
      <svg viewBox="0 0 38.000089 42.000031" xmlns="http://www.w3.org/2000/svg" style={{ width: '85%', height: '85%' }}>
        <path
          fill="#004482"
          fillRule="evenodd"
          d="m 17.903,0.28628166 c 0.679,-0.381 1.515,-0.381 2.193,0 C 23.451,2.1692817 33.547,7.8372817 36.903,9.7202817 37.582,10.100282 38,10.804282 38,11.566282 c 0,3.766 0,15.101 0,18.867 0,0.762 -0.418,1.466 -1.097,1.847 -3.355,1.883 -13.451,7.551 -16.807,9.434 -0.679,0.381 -1.515,0.381 -2.193,0 -3.355,-1.883 -13.451,-7.551 -16.807,-9.434 -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 0,-3.766 0,-15.101 0,-18.867 0,-0.762 0.418,-1.466 1.097,-1.8470003 3.354,-1.883 13.452,-7.551 16.806,-9.43400004 z"
          clipRule="evenodd"
        />
        <path
          fill="#659ad2"
          fillRule="evenodd"
          d="m 0.304,31.404282 c -0.266,-0.356 -0.304,-0.694 -0.304,-1.149 0,-3.744 0,-15.014 0,-18.759 0,-0.758 0.417,-1.458 1.094,-1.8360003 3.343,-1.872 13.405,-7.507 16.748,-9.38000004 0.677,-0.379 1.594,-0.371 2.271,0.008 3.343,1.87200004 13.371,7.45900004 16.714,9.33100004 0.27,0.152 0.476,0.335 0.66,0.5760003 z"
          clipRule="evenodd"
        />
        <path
          fill="#ffffff"
          fillRule="evenodd"
          d="m 19,7.0002817 c 7.727,0 14,6.2730003 14,14.0000003 0,7.727 -6.273,14 -14,14 -7.727,0 -14,-6.273 -14,-14 0,-7.727 6.273,-14.0000003 14,-14.0000003 z m 0,7.0000003 c 3.863,0 7,3.136 7,7 0,3.863 -3.137,7 -7,7 -3.863,0 -7,-3.137 -7,-7 0,-3.864 3.136,-7 7,-7 z"
          clipRule="evenodd"
        />
        <path
          fill="#00599c"
          fillRule="evenodd"
          d="m 37.485,10.205282 c 0.516,0.483 0.506,1.211 0.506,1.784 0,3.795 -0.032,14.589 0.009,18.384 0.004,0.396 -0.127,0.813 -0.323,1.127 l -19.084,-10.5 z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  
  return (
    <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'inherit', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
      {tag.substring(0, 2)}
    </span>
  );
};

function ProjectCard({ project }) {
  const { title, description, tags, github, live, featured } = project;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [modalLinkType, setModalLinkType] = useState(null);
  const [isTouched, setIsTouched] = useState(false);
  const touchStartY = useRef(null);
  const touchScrolled = useRef(false);
  const imageSources = normalizeProjectImages(project);
  const sizes = getSizes();
  const navigate = useNavigate();
  const { triggerTransition } = useMode();

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
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (detailSlug) {
      triggerTransition(() => {
        sessionStorage.setItem('portfolio_scroll_pos', window.scrollY);
        navigate(`/portfolio/projects/${detailSlug}`);
      });
    }
  };

  return (
    <div className={styles.projectCardWrapper}>
      <article
        className={`${styles.projectCard} ${detailSlug ? styles.clickable : ''} ${isTouched ? styles.touched : ''}`}
        onClick={handleCardClick}
        onTouchStart={(e) => {
          touchStartY.current = e.touches[0].clientY;
          touchScrolled.current = false;
          setIsTouched(true);
        }}
        onTouchMove={(e) => {
          if (touchStartY.current === null) return;
          const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
          if (deltaY > 8) {
            touchScrolled.current = true;
            setIsTouched(false);
          }
        }}
        onTouchEnd={() => {
          setIsTouched(false);
          touchStartY.current = null;
        }}
        onTouchCancel={() => {
          setIsTouched(false);
          touchStartY.current = null;
        }}
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
            <div className={styles.typeLine}>
              <span className={styles.ripple} />
              <span className={styles.ripple} />
              <span className={styles.ripple} />
            </div>
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
                  {tags.map((tag, idx) => (
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
                      triggerTransition(() => {
                        sessionStorage.setItem('portfolio_scroll_pos', window.scrollY);
                        navigate(`/portfolio/projects/${detailSlug}`);
                      });
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
