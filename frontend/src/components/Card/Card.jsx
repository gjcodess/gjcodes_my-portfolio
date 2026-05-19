import styles from './Card.module.css';

/**
 * Card component with variants: default, accent, glass, alt
 */
function Card({
  children,
  variant = 'default',
  hoverable = true,
  className = '',
  ...props
}) {
  const classes = [
    styles.card,
    variant !== 'default' && styles[variant],
    hoverable && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default Card;
