import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import styles from './ProjectCard.module.css';

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function ProjectCard({ project }) {
  const { title, description, tags, image, images, github, live, featured } = project;
  const [currentIdx, setCurrentIdx] = useState(0);

  // Normalize image sources to an array
  const imgList = Array.isArray(images)
    ? images.filter(Boolean)
    : image
    ? [image]
    : [];

  useEffect(() => {
    if (imgList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % imgList.length);
    }, 3500); // Change image every 3.5 seconds

    return () => clearInterval(interval);
  }, [imgList.length]);

  return (
    <article className={styles.projectCard}>
      {/* Image / Slideshow */}
      <div className={styles.imageArea}>
        {imgList.length > 0 ? (
          <>
            {imgList.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`${title} screenshot ${idx + 1}`}
                className={`${styles.projectImg} ${
                  idx === currentIdx ? styles.projectImgActive : ''
                }`}
                loading="lazy"
              />
            ))}
            
            {/* Navigation Dots if multiple images */}
            {imgList.length > 1 && (
              <div className={styles.dotsContainer}>
                {imgList.map((_, idx) => (
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
          {github && (
            <a
              href={github}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} on GitHub`}
            >
              <GithubIcon />
              Code
            </a>
          )}
          {live && (
            <a
              href={live}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} live demo`}
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
