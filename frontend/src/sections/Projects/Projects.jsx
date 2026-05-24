import { useState } from 'react';
import { projects } from '../../data/content';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Projects.module.css';

const INITIAL_COUNT = 4;

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const gridRef = useScrollReveal({ direction: 'up', stagger: true, staggerAmount: 0.12 });

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

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
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? 'See Less' : 'See More'}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default Projects;
