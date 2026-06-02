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
          <div className={styles.cardContent}>
            <p className={styles.bannerText}>
              Developer building clean, reliable web systems
            </p>
          </div>
        </div>

        {/* Bio Card */}
        <div className={`${styles.infoCard} ${styles.bioCard}`}>
          <div className={styles.cardContent}>
            <span className={styles.infoLabel}>About Me</span>
            <p className={styles.bioText}>{personalInfo.bio}</p>
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className={`${styles.infoCard} ${styles.techCard}`}>
          <div className={styles.techCardLeft}>
            <span className={styles.techLabel}>My primary<br />tech stack</span>
            <span className={styles.techMainValue}>React, CSS</span>
          </div>
          <div className={styles.techCardRight}>
            <div className={styles.techCol}>
              <span className={styles.techBox}>MySQL</span>
              <span className={styles.techBox}>UI/UX</span>
              <span className={styles.techBox}>n8n</span>
            </div>
            <div className={styles.techCol}>
              <span className={styles.techBox}>HTML5</span>
              <span className={styles.techBox}>C/C++</span>
              <span className={styles.techBox}>Figma</span>
            </div>
          </div>
        </div>

        {/* Code Snippet Card */}
        {/* <div className={styles.codeCard}>
          <div className={styles.cardContent}>
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
        </div> */}

        {/* Location Card */}
        {/* <div className={styles.infoCard}>
          <div className={styles.cardContent}>
            <span className={styles.infoLabel}>Location</span>
            <p className={styles.infoValue}>{personalInfo.location}</p>
          </div>
        </div> */}

        {/* Role Card */}
        <div className={styles.roleCard}>
          <div className={styles.cardContent}>
            <h3 className={styles.roleText}>
              Tech Enthusiast,<br />Aspiring Web Developer
            </h3>
          </div>
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
          <div className={styles.scoopGrid} />
          <div className={styles.scoopGlow} />

          {/* Decorative floating squares */}
          <div className={styles.decoSquare1} />
          <div className={styles.decoSquare2} />
          <div className={styles.decoSquare3} />
          <div className={styles.decoSquare4} />
          <div className={styles.decoSquare5} />
          <div className={styles.decoSquare6} />
          <div className={styles.decoSquare7} />
          <div className={styles.decoSquare8} />
          <div className={styles.decoSquare9} />
          <div className={styles.decoSquare10} />
          <div className={styles.decoSquare12} />

          <div className={styles.scoopLeft}>
            <span className={styles.scoopLabel}>
              The Inside<br />Scoop
            </span>
            <h3 className={styles.scoopText}>
              Graduating soon,<br />exploring what's next
            </h3>
          </div>

          <div className={styles.scoopRight}>
            <div className={styles.codePanel}>
              <div className={styles.codeHeader}>
                <span className={`${styles.codeDot} ${styles.codeDotRed}`} />
                <span className={`${styles.codeDot} ${styles.codeDotYellow}`} />
                <span className={`${styles.codeDot} ${styles.codeDotGreen}`} />
              </div>
              <div className={styles.codeBody}>
                <div className={styles.codeLine}>
                  <span className={styles.codeNum}>1</span>
                  <span><span className={styles.codeComment}>{'// Career status'}</span></span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.codeNum}>2</span>
                  <span>
                    <span className={styles.codeKeyword}>import </span>
                    {'{ dev } '}
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
                    <span className={styles.codeProp}>explore</span>
                    {'() {'}
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.codeNum}>5</span>
                  <span>
                    {'  '}
                    <span className={styles.codeKeyword}>const </span>
                    {'status = '}
                    <span className={styles.codeString}>'Graduating'</span>
                    {';'}
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.codeNum}>6</span>
                  <span>
                    {'  '}
                    <span className={styles.codeKeyword}>return </span>
                    <span className={styles.codeProp}>dev</span>
                    {'.goals;'}
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.codeNum}>7</span>
                  <span>{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className={styles.contactCard}>
          <div className={styles.cardContent}>
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
