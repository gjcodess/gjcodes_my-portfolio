import { skills } from '../../data/content';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Skills.module.css';

function Skills() {
  const gridRef = useScrollReveal({ direction: 'up', stagger: true, staggerAmount: 0.08 });

  return (
    <SectionWrapper
      id="skills"
      label="Skills"
      title="Tech Stack"
      subtitle="Technologies and tools I work with daily"
      altBg
    >
      <div className={styles.skillsGrid} ref={gridRef}>
        {skills.map((category) => (
          <div key={category.category} className={styles.skillCard}>
            <div className={styles.cardContent}>
              <h3 className={styles.categoryName}>{category.category}</h3>
              <div className={styles.skillList}>
                {category.items.map((item) => (
                  <span key={item} className={styles.skillPill}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Skills;
