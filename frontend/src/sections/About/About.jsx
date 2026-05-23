import { useState } from 'react';
import { personalInfo, stats } from '../../data/content';
import { Copy } from 'lucide-react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './About.module.css';

function About() {
  const [isCopied, setIsCopied] = useState(false);
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

        {/* Role Card */}
        <div className={styles.roleCard}>
          <h3 className={styles.roleText}>
            Tech Enthusiast,<br />Aspiring Web Developer
          </h3>
          <div className={styles.uiMockup}>
            <div className={styles.uiMockupHeader}>
              <div className={styles.uiDot} />
              <div className={`${styles.uiLine} ${styles.uiLineShort}`} />
              <div className={`${styles.uiLine} ${styles.uiLineShort}`} />
            </div>
            <div className={`${styles.uiLine} ${styles.uiLineLong}`} />
            <div className={`${styles.uiLine} ${styles.uiLineMedium}`} />
          </div>
        </div>

        {/* Inside Scoop Card */}
        <div className={`${styles.codeCard} ${styles.tallCard}`}>
          <div className={styles.codeOverlay}>
            <span className={styles.scoopLabel}>The Inside Scoop</span>
            <p className={styles.scoopText}>Graduating soon, exploring what's next</p>
          </div>
          <div className={styles.codeHeader}>
            <span className={`${styles.codeDot} ${styles.codeDotRed}`} />
            <span className={`${styles.codeDot} ${styles.codeDotYellow}`} />
            <span className={`${styles.codeDot} ${styles.codeDotGreen}`} />
          </div>
          <div className={styles.codeBody}>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>1</span>
              <span><span className={styles.codeComment}>{'// Career exploration status'}</span></span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>2</span>
              <span>
                <span className={styles.codeKeyword}>import </span>
                {'{ developer } '}
                <span className={styles.codeKeyword}>from </span>
                <span className={styles.codeString}>'./profile'</span>
                {';'}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>3</span>
              <span>&nbsp;</span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>4</span>
              <span>
                <span className={styles.codeKeyword}>export async function </span>
                <span className={styles.codeProp}>exploreOpportunities</span>
                {'() {'}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>5</span>
              <span>
                {'  '}
                <span className={styles.codeKeyword}>const </span>
                {'status = '}
                <span className={styles.codeString}>'Graduating Soon'</span>
                {';'}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>6</span>
              <span>&nbsp;</span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>7</span>
              <span>
                {'  '}
                <span className={styles.codeKeyword}>if </span>
                {'(developer.status === status) {'}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>8</span>
              <span>
                {'    '}
                <span className={styles.codeKeyword}>const </span>
                {'goals = '}
                <span className={styles.codeKeyword}>await </span>
                <span className={styles.codeProp}>fetchGoals</span>
                {'();'}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>9</span>
              <span>
                {'    '}
                <span className={styles.codeKeyword}>return </span>
                {'goals.filter(g => g.type === '}
                <span className={styles.codeString}>'web-dev'</span>
                {');'}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>10</span>
              <span>
                {'  }'}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>11</span>
              <span>
                {'  '}
                <span className={styles.codeKeyword}>return </span>
                {'[];'}
              </span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeNum}>12</span>
              <span>
                {'}'}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className={styles.contactCard}>
          <h3 className={styles.contactText}>Do you want to ask a question?</h3>
          <button
            className={styles.copyButton}
            onClick={() => {
              navigator.clipboard.writeText(personalInfo.email);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 3000);
            }}
          >
            <Copy size={16} />
            {isCopied ? 'Email is Copied!' : 'Copy my email address'}
          </button>
        </div>

        {/* Stats Row */}
        {/* <div className={styles.statsRow}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </SectionWrapper>
  );
}

export default About;
