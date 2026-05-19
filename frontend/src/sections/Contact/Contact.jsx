import { MapPin, Briefcase, Mail } from 'lucide-react';
import { personalInfo } from '../../data/content';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import ContactForm from '../../components/ContactForm/ContactForm';
import SocialLinks from '../../components/SocialLinks/SocialLinks';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Contact.module.css';

function Contact() {
  const layoutRef = useScrollReveal({ direction: 'up', stagger: true, staggerAmount: 0.15 });

  return (
    <SectionWrapper
      id="contact"
      label="Contact"
      title="Get In Touch"
      subtitle="Have a project in mind or just want to say hello?"
      altBg
    >
      <div className={styles.contactLayout} ref={layoutRef}>
        {/* Left — Info */}
        <div className={styles.contactInfo}>
          <p className={styles.contactIntro}>
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of something great. Feel free to reach out!
          </p>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Briefcase size={20} />
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Current Position</span>
              <span className={styles.infoValue}>{personalInfo.currentPosition}</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <MapPin size={20} />
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Location</span>
              <span className={styles.infoValue}>{personalInfo.location}</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Mail size={20} />
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{personalInfo.email}</span>
            </div>
          </div>

          <div className={styles.socialSection}>
            <p className={styles.socialTitle}>Find me on</p>
            <SocialLinks />
          </div>
        </div>

        {/* Right — Form */}
        <ContactForm />
      </div>
    </SectionWrapper>
  );
}

export default Contact;
