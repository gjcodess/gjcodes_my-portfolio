import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
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

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <p className={styles.modalText}>
          Sorry, there is no {linkType} link available for this project yet.
        </p>
        <button className={styles.modalClose} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const { title, description, tags, github, live, featured } = project;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [modalLinkType, setModalLinkType] = useState(null);
  const imageSources = normalizeProjectImages(project);
  const sizes = getSizes();

  const hasGithub = isLinkAvailable(github);
  const hasLive = isLinkAvailable(live);

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

  return (
    <article className={styles.projectCard}>
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
                    className={`${styles.dot} ${
                      idx === currentIdx ? styles.dotActive : ''
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

        {/* Tags */}
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className={styles.links}>
          {github !== undefined && (
            <a
              href={hasGithub ? github : '#'}
              className={styles.link}
              target={hasGithub ? '_blank' : undefined}
              rel={hasGithub ? 'noopener noreferrer' : undefined}
              aria-label={`View ${title} on GitHub`}
              onClick={hasGithub ? undefined : (e) => handleUnavailableLink(e, 'GitHub')}
            >
              <GithubIcon />
              Code
            </a>
          )}
          {live !== undefined && (
            <a
              href={hasLive ? live : '#'}
              className={styles.link}
              target={hasLive ? '_blank' : undefined}
              rel={hasLive ? 'noopener noreferrer' : undefined}
              aria-label={`View ${title} live demo`}
              onClick={hasLive ? undefined : (e) => handleUnavailableLink(e, 'Live')}
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
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
  );
}

export default ProjectCard;
