import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Timeline.module.css';

function Timeline({ items }) {
  const listRef = useScrollReveal({
    direction: 'up',
    stagger: true,
    staggerAmount: 0.15,
  });

  return (
    <div className={styles.timeline} ref={listRef}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.node} />
          <div className={styles.itemContent}>
            <div className={styles.cardContent}>
              <span className={styles.period}>{item.period}</span>
              <h3 className={styles.role}>
                {item.shortRole || item.shortDegree ? (
                  <>
                    <span className={styles.desktopOnly}>{item.role || item.degree}</span>
                    <span className={styles.mobileOnly}>{item.shortRole || item.shortDegree}</span>
                  </>
                ) : (
                  item.role || item.degree
                )}
              </h3>
              <p className={styles.company}>{item.company || item.school}</p>
              {Array.isArray(item.description) ? (
                <ul className={styles.descList}>
                  {item.description.map((descItem, i) => (
                    <li key={i}>{descItem}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.desc}>{item.description}</p>
              )}
              {item.technologies && (
                <div className={styles.techList}>
                  {item.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
