import { personalInfo, stats } from '../../data/content';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './About.module.css';

function About() {
  const gridRef = useScrollReveal({ direction: 'up', stagger: true, staggerAmount: 0.1 });

  return (
    <SectionWrapper
      id="about"
      label="About"
      title="Short Profile"
      subtitle="A glimpse into who I am and what drives my work"
    >
      <div className={styles.bentoGrid} ref={gridRef}>
        {/* Banner Card */}
        <div className={styles.bannerCard}>
          <p className={styles.bannerText}>
            Developer building clean, reliable<br />
            web systems
          </p>
        </div>

        {/* Bio Card */}
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>About Me</span>
          <p className={styles.bioText}>{personalInfo.bio}</p>
        </div>

        {/* Tech Stack Card */}
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Primary Tech Stack</span>
          <p className={styles.infoValue}>Web Development and Languages</p>
          <div className={styles.techPills}>
            {['React', 'Node.js', 'Next.js', "HTML", "CSS", "MySQL", "C/C++", "Java", "Python"].map(
              (tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              )
            )}
          </div>
          <p className={styles.infoValue}>Tools & Platforms</p>
          <div className={styles.techPills}>
            {["Figma", "Capcut", "Canva", "VS Code", "Github/Git Actions", "Microsoft Office Apps", "Google Workspaces", "Adobe Suite"].map(
              (tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              )
            )}
          </div>
        </div>

        {/* Code Snippet Card */}
        <div className={styles.codeCard}>
          <div className={styles.codeHeader}>
            <span className={`${styles.codeDot} ${styles.codeDotRed}`} />
            <span className={`${styles.codeDot} ${styles.codeDotYellow}`} />
            <span className={`${styles.codeDot} ${styles.codeDotGreen}`} />
          </div>
          <div className={styles.codeBody}>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>1</span>
              <span><span className={styles.codeComment}>{'// Developer profile'}</span></span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>2</span>
              <span>
                <span className={styles.codeKeyword}>const </span>
                <span className={styles.codeProp}>developer</span>
                {' = {'}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>3</span>
              <span>
                {'  name: '}
                <span className={styles.codeString}>{`"${personalInfo.name}"`}</span>
                {','}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>4</span>
              <span>
                {'  role: '}
                <span className={styles.codeString}>{`"${personalInfo.role}"`}</span>
                {','}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>5</span>
              <span>
                {'  passion: '}
                <span className={styles.codeString}>"building things and troubleshoot"</span>
                {','}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>6</span>
              <span>
                {'  available: '}
                <span className={styles.codeMint}>true</span>
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>7</span>
              <span>{'};'}</span>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Location</span>
          <p className={styles.infoValue}>{personalInfo.location}</p>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default About;
