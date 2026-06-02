import React from 'react';
import { skills } from '../../data/content';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import useScrollReveal from '../../hooks/useScrollReveal';
import { techMap } from '../../utils/techIcons';
import { Code2, Server, Database as DbIcon, Terminal, Palette, Cpu } from 'lucide-react';
import styles from './Skills.module.css';

// Map categories to Lucide icons
const categoryIconMap = {
  'Frontend': Code2,
  'Database': DbIcon,
  'Backend': Server,
  'DevOps & Tools': Terminal,
  'Design': Palette,
  'Other': Cpu,
};

// Map categories to specific CSS grid span classes
const categoryClassMap = {
  'Frontend': styles.cardFrontend,
  'Database': styles.cardDatabase,
  'Backend': styles.cardBackend,
  'DevOps & Tools': styles.cardDevops,
  'Design': styles.cardDesign,
  'Other': styles.cardOther,
};

// Helper to convert hex to rgba for dynamic inline hover values
function hexToRgba(hex, alpha) {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) {
    return `rgba(255, 255, 255, ${alpha})`;
  }
  let cleanHex = hex.slice(1);
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function Skills() {
  const gridRef = useScrollReveal({ direction: 'up', stagger: true, staggerAmount: 0.08 });


  // Helper to split primary and supporting items in each category
  const getGroupedItems = (items) => {
    const primary = [];
    const supporting = [];

    items.forEach((item) => {
      const tech = techMap[item];
      if (tech && tech.isPrimary) {
        primary.push(item);
      } else {
        supporting.push(item);
      }
    });

    return { primary, supporting };
  };

  // Render individual tech item badge/pill
  const renderTechItem = (item, isPrimary) => {
    const tech = techMap[item] || {
      color: '#9CA3AF',
      isPrimary: false,
      icon: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
    };

    const inlineStyles = {
      '--brand-color': tech.color,
      '--brand-glow-bg': hexToRgba(tech.color, 0.08),
      '--brand-glow-border': hexToRgba(tech.color, 0.25),
    };

    const IconComponent = tech.icon;

    return (
      <div
        key={item}
        className={`${styles.techItem} ${isPrimary ? styles.primaryItem : styles.supportingItem}`}
        style={inlineStyles}
      >
        <span className={styles.techIcon}>
          <IconComponent />
        </span>
        <span className={styles.techName}>{item}</span>
      </div>
    );
  };

  return (
    <SectionWrapper
      id="skills"
      label="Skills"
      title="Tech Stack"
      subtitle="Technologies and tools I work with daily"
      altBg
    >
      <div className={styles.skillsGrid} ref={gridRef}>
        {skills.map((category) => {
          const { primary, supporting } = getGroupedItems(category.items);
          const isWide = ['Frontend', 'DevOps & Tools', 'Other'].includes(category.category);
          const IconComponent = categoryIconMap[category.category] || Code2;
          const spanClass = categoryClassMap[category.category] || '';

          return (
            <div
              key={category.category}
              className={`${styles.skillCard} ${spanClass}`}
            >
              <div className={styles.cardContent}>
                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.titleGroup}>
                    <span className={styles.categoryIcon}>
                      <IconComponent size={20} strokeWidth={1.5} />
                    </span>
                    <h3 className={styles.categoryName}>{category.category}</h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  {isWide ? (
                    // Wide Card: Two-column layout
                    <div className={styles.gridBody}>
                      {primary.length > 0 && (
                        <div className={styles.columnSection}>
                          <span className={styles.sectionLabel}>// Focus / Core</span>
                          <div className={styles.techList}>
                            {primary.map(item => renderTechItem(item, true))}
                          </div>
                        </div>
                      )}
                      {supporting.length > 0 && (
                        <div className={styles.columnSection}>
                          <span className={styles.sectionLabel}>// Tools & Utilities</span>
                          <div className={styles.techList}>
                            {supporting.map(item => renderTechItem(item, false))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Standard Card: Grouped list layout
                    <div className={styles.standardBody}>
                      {primary.length > 0 && (
                        <div className={styles.columnSection}>
                          <span className={styles.sectionLabel}>// Focus</span>
                          <div className={styles.techList}>
                            {primary.map(item => renderTechItem(item, true))}
                          </div>
                        </div>
                      )}
                      {supporting.length > 0 && (
                        <div className={styles.columnSection}>
                          <span className={styles.sectionLabel}>// Others</span>
                          <div className={styles.techList}>
                            {supporting.map(item => renderTechItem(item, false))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

export default Skills;
