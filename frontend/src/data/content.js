/* ============================================
   Placeholder Content Data
   Replace this file with your real content
   ============================================ */

export const personalInfo = {
  name: 'Glenn Joshua',
  lastName: 'Corpus',
  role: 'Web Developer & Technical Support',
  tagline: 'IT Specialist & Full-Stack Web Developer | Pragmatic, delivery-oriented | Technical Support',
  bio: `I build clean, scalable, and reliable web applications rooted in a deep understanding of computer systems and hardware. Passionate about crafting digital experiences that combine technical precision with thoughtful design. Focused on delivering production-ready systems that make a real impact.`,
  email: 'glennjoshuacorpus@gmail.com',
  location: 'Philippines, Parañaque City',
  currentPosition: 'Full Stack Developer',
  resumeUrl: '#',
  avatar: '\my-photo.jpg', // Will be replaced with actual image path
};

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/imapoopzz', icon: 'Github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/glenn-joshua-corpus-671b5b18a/', icon: 'Linkedin' },
  { name: 'Facebook', url: 'https://www.facebook.com/corpus.glenn.joshua.7', icon: 'Facebook' },
  { name: 'Instagram', url: 'https://www.instagram.com/imapoopypie/', icon: 'Instagram' },
  { name: 'X', url: 'https://x.com/nnelgsuproc', icon: 'Twitter' },
  { name: 'Gmail', url: 'mailto:glennjoshuacorpus@gmail.com', icon: 'Mail' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export const skills = [
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'Python', 'JavaScript', 'REST APIs'],
  },
  {
    category: 'Database',
    items: ['MySQL', 'PostgreSQL', 'NeonDB', 'Supabase'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Git', 'Linux', 'Vercel', "Railway", 'GitHub Actions', "n8n Automation"],
  },
  {
    category: 'Design',
    items: ['Figma', 'Adobe Suite', 'Responsive Design', 'UI/UX', "Canva"],
  },
  {
    category: 'Other',
    items: ['Agile/Scrum', 'CI/CD', 'Testing', 'SEO', 'Performance Optimization'],
  },
];

export const projects = [
  {
    id: 1,
    title: 'LaborConnect',
    description: 'A full-stack web app for managing labor union membership, services, and administration. Provides a member self-service portal, a department ticket-handling portal, and a comprehensive admin dashboard for union operations.',
    tags: ['React', 'Node.js', 'CSS', 'MySQL', 'n8n', "Vercel", "Railway"],
    images: [
      '/LaborConnect-1.png',
      '/LaborConnect-2.png',
      '/LaborConnect-3.png',
    ],
    github: 'https://github.com/imapoopzz/ThesisProj',
    live: 'https://www.laborconnect.app',
    featured: true,
  },

  {
    id: 2,
    title: 'MangaVerse',
    description: 'A modern, immersive UI/UX design for MangaVerse — a Japanese comics (manga) and anime reading mobile application.',
    tags: ['Python', 'FastAPI', 'Redis', 'GitHub Actions'],
    image: '\MangaVerse-1.png',
    github: 'https://github.com/',
    live: 'https://www.figma.com/proto/y3JbsPe7btzPUtRmEN71ni/MangaVerse?node-id=283-1625&t=tS9s8rszJlWNVM4u-1&starting-point-node-id=285%3A2486',
    featured: true,
  },

  {
    id: 3,
    title: 'Gcorp.',
    description: 'A full-stack e-commerce web app for a computer systems and gadgets store (Gcorp), featuring product browsing, shopping cart, user accounts, order management, and admin tools.',
    tags: ['Next.js', 'PostgreSQL', 'Express', 'Docker'],
    images: [
      '/Gcorp-1.png',
      '/Gcorp-2.png',
      '/Gcorp-3.png',
    ],
    github: 'https://github.com/imapoopzz/WebDev_Project',
    live: ' ',
    featured: false,
  },

  {
    id: 4,
    title: 'kAIn',
    description: 'KAIN (a Filipino word for “eat”) is a smart, intuitive mobile application that helps users effortlessly track their daily food intake, monitor nutrition, and build healthier eating habits with the assistance of Artificial Intelligence.',
    tags: ['React', 'PWA', 'Firebase', 'Workbox'],
    image: '\kAIn-1.png',
    github: 'https://github.com/',
    live: 'https://www.figma.com/proto/rPlg6lcGFfdD33MWG6waZ5/UX-TO-GO---KAIN?node-id=36-918&t=EkmEJSsStUOT9Z9b-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1',
    featured: false,
  },
];

export const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer',
    company: 'Tech Company A',
    period: '2024 — Present',
    description: 'Developing and maintaining scalable web applications. Leading frontend architecture decisions and implementing backend APIs for production systems.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 2,
    role: 'Web Developer Intern',
    company: 'Startup B',
    period: '2023 — 2024',
    description: 'Built responsive web interfaces and contributed to backend services. Collaborated with cross-functional teams in agile sprints.',
    technologies: ['JavaScript', 'PHP', 'MySQL'],
  },
  {
    id: 3,
    role: 'Freelance Developer',
    company: 'Self-Employed',
    period: '2022 — 2023',
    description: 'Delivered custom web solutions for clients including e-commerce platforms, portfolio sites, and business management tools.',
    technologies: ['React', 'Firebase', 'Figma'],
  },
];

export const education = [
  {
    id: 1,
    degree: 'Bachelor of Science in Information Technology',
    school: 'University Name',
    period: '2021 — 2025',
    description: 'Focused on software engineering, web development, and database management systems.',
  },
];

export const services = [
  {
    title: 'Web Development',
    description: 'Building responsive, performant web applications with modern frameworks and best practices.',
    icon: 'Globe',
  },
  {
    title: 'Backend Systems',
    description: 'Designing robust APIs, database architectures, and server-side logic for scalable applications.',
    icon: 'Server',
  },
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive, visually appealing interfaces with attention to user experience and accessibility.',
    icon: 'Palette',
  },
  {
    title: 'API Development',
    description: 'Building RESTful and GraphQL APIs with authentication, rate limiting, and comprehensive documentation.',
    icon: 'Zap',
  },
  {
    title: 'Database Design',
    description: 'Architecting efficient database schemas, optimizing queries, and implementing data migration strategies.',
    icon: 'Database',
  },
  {
    title: 'DevOps & Deployment',
    description: 'Setting up CI/CD pipelines, containerization, cloud deployment, and monitoring infrastructure.',
    icon: 'Cloud',
  },
];

export const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Completed' },
  { value: '20+', label: 'Technologies' },
  { value: '100%', label: 'Commitment' },
];
