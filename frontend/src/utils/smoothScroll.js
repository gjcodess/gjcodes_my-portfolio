/**
 * Smooth scroll utility for navigating to sections
 */
export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 80; // var(--nav-height)
    const offsetTop = element.offsetTop - navHeight;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }
}

/**
 * Scroll to top of page
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
