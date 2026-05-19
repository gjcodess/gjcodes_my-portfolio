import { experiences, education } from '../../data/content';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import Timeline from '../../components/Timeline/Timeline';
import styles from './Experience.module.css';

function Experience() {
  return (
    <SectionWrapper
      id="experience"
      label="Experience"
      title="My Journey"
      subtitle="Where I've been and what I've learned along the way"
      altBg
    >
      <div className={styles.experienceLayout}>
        <div>
          <h3 className={styles.subHeading}>Work Experience</h3>
          <Timeline items={experiences} />
        </div>
        <div>
          <h3 className={styles.subHeading}>Education</h3>
          <Timeline items={education} />
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Experience;
