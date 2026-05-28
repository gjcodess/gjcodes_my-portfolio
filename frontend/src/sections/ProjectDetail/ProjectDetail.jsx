import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, ExternalLink, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectDetails } from '../../data/projectDetails';
import styles from './ProjectDetail.module.css';

const PROJECT_IMAGE_SIZES = [400, 800, 1200];
const FALLBACK_SIZE = 800;

const buildSrcSet = (base, ext) =>
  PROJECT_IMAGE_SIZES.map((size) => `/${base}-${size}.${ext} ${size}w`).join(', ');

const isLinkAvailable = (url) => typeof url === 'string' && url.trim().length > 0;

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const project = projectDetails.find((p) => p.id === slug);

  // Track scroll position to show/hide floating back button
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    if (!project || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.1,
      });

      // Staggered sections
      gsap.from(sectionsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const hasLive = isLinkAvailable(project.liveLink);
  const hasGithub = isLinkAvailable(project.githubRepo);
  const hasLogo = isLinkAvailable(project.logoPath);

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const handleBack = () => {
    navigate('/portfolio');
    // Scroll to projects section after navigation only if we don't have an exact scroll position to restore
    if (!sessionStorage.getItem('portfolio_scroll_pos')) {
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const nextImage = () => {
    if (project.screenshots?.length) {
      setCurrentImageIdx((prev) => (prev + 1) % project.screenshots.length);
    }
  };

  const prevImage = () => {
    if (project.screenshots?.length) {
      setCurrentImageIdx((prev) => (prev === 0 ? project.screenshots.length - 1 : prev - 1));
    }
  };

  return (
    <div className={styles.page} ref={pageRef}>
      <div className={styles.container}>
        {/* ── Back Button ── */}
        <button className={styles.backBtn} onClick={handleBack} aria-label="Back to portfolio">
          <ArrowLeft size={18} />
          <span>Back to Projects</span>
        </button>

        {/* ── Floating Sticky Back Button ── */}
        <button 
          className={`${styles.floatingBackBtn} ${scrolled ? styles.floatingBackBtnVisible : ''}`} 
          onClick={handleBack} 
          aria-label="Back to portfolio"
        >
          <ArrowLeft size={18} />
        </button>

        {/* ── Header ── */}
        <header className={styles.header} ref={headerRef}>
          <div className={styles.headerContent}>
            <div className={styles.headerTitleArea}>
              {hasLogo ? (
                <img
                  src={project.logoPath}
                  alt={`${project.name} logo`}
                  className={`${styles.logo} ${styles.logoEnlarged}`}
                  loading="eager"
                />
              ) : (
                <h1 className={styles.projectName}>{project.name}</h1>
              )}
            </div>

            
          </div>
          <div className={styles.headerAccent} />
        </header>

        {/* ── Screenshots Carousel ── */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className={styles.carouselSection} ref={addSectionRef}>
            <div className={styles.carouselContainer}>
              {project.screenshots.map((base, idx) => (
                <div
                  key={base}
                  className={`${styles.carouselSlide} ${idx === currentImageIdx ? styles.activeSlide : ''}`}
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={buildSrcSet(base, 'webp')}
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                    <img
                      src={`/${base}-${FALLBACK_SIZE}.jpg`}
                      srcSet={buildSrcSet(base, 'jpg')}
                      sizes="(max-width: 768px) 100vw, 1200px"
                      alt={`${project.name} screenshot ${idx + 1}`}
                      className={styles.carouselImg}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              ))}

              {project.screenshots.length > 1 && (
                <>
                  <button className={`${styles.carouselBtn} ${styles.prevBtn}`} onClick={prevImage} aria-label="Previous image">
                    <ChevronLeft size={24} />
                  </button>
                  <button className={`${styles.carouselBtn} ${styles.nextBtn}`} onClick={nextImage} aria-label="Next image">
                    <ChevronRight size={24} />
                  </button>

                  <div className={styles.carouselIndicators}>
                    {project.screenshots.map((_, idx) => (
                      <span
                        key={idx}
                        className={`${styles.indicatorDot} ${idx === currentImageIdx ? styles.activeDot : ''}`}
                        onClick={() => setCurrentImageIdx(idx)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* ── Two Column Content ── */}
        <div className={styles.contentGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* ── Overview Section ── */}
            <section className={styles.section} ref={addSectionRef}>
              <div className={styles.sectionLabel}>
                <span className={styles.labelDot} />
                Overview
              </div>
              <div className={styles.glassCard}>
                <p className={styles.description}>{project.description}</p>
              </div>
            </section>

            {/* ── Role / Contribution ── */}
            <section className={styles.section} ref={addSectionRef}>
              <div className={styles.sectionLabel}>
                <span className={styles.labelDot} />
                My Role & Contribution
              </div>
              <div className={`${styles.glassCard} ${styles.roleCard}`}>
                <p className={styles.roleText}>{project.role}</p>
              </div>
            </section>

            {/* Desktop Actions (visible on large screen) */}
            {(hasLive || hasGithub) && (
              <div className={`${styles.ctaRow} ${styles.desktopActions}`}>
                {hasLive && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaPrimary}
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
                {hasGithub && (
                  <a
                    href={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaSecondary}
                  >
                    <GithubIcon size={16} />
                    <span>GitHub Repository</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* ── Features ── */}
            <section className={styles.section} ref={addSectionRef}>
              <div className={styles.sectionLabel}>
                <span className={styles.labelDot} />
                Key Features
              </div>
              <div className={styles.glassCard}>
                <ul className={styles.featuresList}>
                  {project.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <CheckCircle2 size={16} className={styles.featureIcon} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── Tech Stack (Tags) ── */}
            <section className={styles.section} ref={addSectionRef}>
              <div className={styles.sectionLabel}>
                <span className={styles.labelDot} />
                Tags
              </div>
              <div className={styles.techGrid}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Mobile Actions (visible on small screen) */}
            {(hasLive || hasGithub) && (
              <div className={`${styles.ctaRow} ${styles.mobileActions}`}>
                {hasLive && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaPrimary}
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
                {hasGithub && (
                  <a
                    href={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaSecondary}
                  >
                    <GithubIcon size={16} />
                    <span>GitHub Repository</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}

export default ProjectDetail;
