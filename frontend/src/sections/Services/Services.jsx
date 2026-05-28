import { services } from '../../data/content';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Services.module.css';

function Services() {
  const gridRef = useScrollReveal({ direction: 'up', stagger: true, staggerAmount: 0.08 });

  return (
    <SectionWrapper
      id="services"
      label="Expertise"
      title="What I Do"
      subtitle="Services and expertise I bring to every project"
    >
      <div className={styles.servicesGrid} ref={gridRef}>
        {services.map((service) => (
          <div key={service.title} className={styles.serviceCard}>
            {/* Animated glowing border */}
            <div className={styles.glowBorder} />
            <div className={styles.cardContent}>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Services;
