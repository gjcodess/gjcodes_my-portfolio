import styles from './Button.module.css';

/**
 * Button component with variants: primary, secondary, tertiary, icon
 */
function Button({
  children,
  variant = 'primary',
  icon: Icon,
  iconPosition = 'right',
  href,
  onClick,
  disabled = false,
  className = '',
  ...props
}) {
  const classes = `${styles.btn} ${styles[variant]} ${className}`.trim();

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <span className={styles.btnIcon}>
          <Icon size={18} />
        </span>
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <span className={styles.btnIcon}>
          <Icon size={18} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
