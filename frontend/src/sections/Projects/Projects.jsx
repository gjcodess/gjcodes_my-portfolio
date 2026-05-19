import { projects } from '../../data/content';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Projects.module.css';

function Projects() {
  const gridRef = useScrollReveal({ direction: 'up', stagger: true, staggerAmount: 0.12 });

  return (
    <SectionWrapper
      id="projects"
      label="Work"
      title="Featured Projects"
      subtitle="A selection of projects I've built and contributed to"
    >
      <div className={styles.projectsGrid} ref={gridRef}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Projects;
