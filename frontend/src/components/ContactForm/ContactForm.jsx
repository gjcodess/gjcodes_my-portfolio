import { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../Button/Button';
import styles from './ContactForm.module.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          className={styles.input}
          type="text"
          name="name"
          placeholder="What should I call you?"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          className={styles.input}
          type="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          className={styles.textarea}
          name="message"
          placeholder="Tell me about your project or just say hello..."
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      {status === 'success' && (
        <p className={styles.success}>Message sent successfully! I'll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className={styles.error}>Something went wrong. Please try again or email me directly.</p>
      )}

      <div className={styles.submitBtn}>
        <Button
          variant="secondary"
          type="submit"
          icon={Send}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
