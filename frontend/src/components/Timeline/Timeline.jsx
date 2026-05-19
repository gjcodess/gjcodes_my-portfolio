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
            <span className={styles.period}>{item.period}</span>
            <h3 className={styles.role}>{item.role || item.degree}</h3>
            <p className={styles.company}>{item.company || item.school}</p>
            <p className={styles.desc}>{item.description}</p>
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
      ))}
    </div>
  );
}

export default Timeline;
