import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { projects } from '../../data/content';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Projects.module.css';

const INITIAL_COUNT = 4;

function Projects() {
  const [showAll, setShowAll] = useState(() => {
    return sessionStorage.getItem('portfolio_showAll') === 'true';
  });
  const [isRestoringScroll] = useState(() => {
    return !!sessionStorage.getItem('portfolio_scroll_pos');
  });
  
  const gridRef = useScrollReveal({ 
    direction: 'up', 
    stagger: true, 
    staggerAmount: 0.12,
    disabled: isRestoringScroll
  });

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  useEffect(() => {
    sessionStorage.setItem('portfolio_showAll', showAll);
  }, [showAll]);

  useLayoutEffect(() => {
    const savedScrollPos = sessionStorage.getItem('portfolio_scroll_pos');
    if (savedScrollPos) {
      window.scrollTo({ top: parseInt(savedScrollPos, 10), behavior: 'instant' });
      sessionStorage.removeItem('portfolio_scroll_pos');
    }
  }, []);

  const toggleShowAll = () => {
    if (!gridRef.current) {
      setShowAll(!showAll);
      return;
    }

    if (!showAll) {
      setShowAll(true);
      setTimeout(() => {
        const children = Array.from(gridRef.current.children).slice(INITIAL_COUNT);
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.08, 
            ease: 'power3.out',
            onComplete: () => {
              gsap.set(children, { clearProps: 'transform' });
            }
          }
        );
      }, 0);
    } else {
      const children = Array.from(gridRef.current.children).slice(INITIAL_COUNT);
      gsap.to(children, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power3.in',
        onComplete: () => {
          setShowAll(false);
          // Optional: scroll back to top of projects section when collapsing
          const section = document.getElementById('projects');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        },
      });
    }
  };

  return (
    <SectionWrapper
      id="projects"
      label="Work"
      title="Featured Projects"
      subtitle="A selection of projects I've built and contributed to"
    >
      <div className={styles.projectsGrid} ref={gridRef}>
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {hasMore && (
        <div className={styles.toggleWrapper}>
          <button
            className={styles.toggleBtn}
            onClick={toggleShowAll}
          >
            {showAll ? 'See Less' : 'See More'}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default Projects;
