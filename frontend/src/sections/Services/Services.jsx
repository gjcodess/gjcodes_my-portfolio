import * as LucideIcons from 'lucide-react';
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
        {services.map((service) => {
          const Icon = LucideIcons[service.icon];
          return (
            <div key={service.title} className={styles.serviceCard}>
              <div className={styles.cardContent}>
                <div className={styles.serviceIcon}>
                  {Icon && <Icon size={24} />}
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

export default Services;
