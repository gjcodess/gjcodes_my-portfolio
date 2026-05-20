/* ============================================
   Placeholder Content Data
   Replace this file with your real content
   ============================================ */

export const personalInfo = {
  name: 'Glenn Joshua Corpus',
  lastName: 'Corpus',
  role: 'Web Developer & Technical Support',
  tagline: 'IT Specialist & Full-Stack Web Developer | Technical Support | Pragmatic, Delivery-oriented',
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
    items: ['Computer assembly', 'Troubleshooting', 'Networking', 'Basic hardware knowledge'],
  },
];

export const projects = [
  {
    id: 1,
    title: 'LaborConnect',
    description: 'A full-stack web app for managing labor union membership, services, and administration. Provides a member self-service portal, a department ticket-handling portal, and a comprehensive admin dashboard for union operations.',
    tags: ['React', 'Node.js', 'CSS', 'MySQL', 'n8n', "Vercel", "Railway"],
    imageBases: ['LaborConnect-1', 'LaborConnect-2', 'LaborConnect-3'],
    github: 'https://github.com/imapoopzz/ThesisProj',
    live: 'https://www.laborconnect.app',
    featured: true,
  },

  {
    id: 2,
    title: 'MangaVerse',
    description: 'A modern, immersive UI/UX design for MangaVerse — a Japanese comics (manga) and anime reading mobile application.',
    tags: ['Figma', 'User Interface', 'Mobile Application Design', 'Prototyping'],
    imageBase: 'MangaVerse-1',
    github: ' ',
    live: 'https://www.figma.com/proto/y3JbsPe7btzPUtRmEN71ni/MangaVerse?node-id=283-1625&t=tS9s8rszJlWNVM4u-1&starting-point-node-id=285%3A2486',
    featured: true,
  },

  {
    id: 3,
    title: 'Gcorp.',
    description: 'A full-stack e-commerce web app for a computer systems and gadgets store (Gcorp), featuring product browsing, shopping cart, user accounts, order management, and admin tools.',
    tags: ['Next.js', 'PostgreSQL', 'Express', 'Docker'],
    imageBases: ['Gcorp-1', 'Gcorp-2', 'Gcorp-3'],
    github: 'https://github.com/imapoopzz/WebDev_Project',
    live: ' ',
    featured: false,
  },

  {
    id: 4,
    title: 'kAIn',
    description: 'KAIN (a Filipino word for “eat”) is a smart, intuitive mobile application that helps users effortlessly track their daily food intake, monitor nutrition, and build healthier eating habits with the assistance of Artificial Intelligence.',
    tags: ['Figma', 'User Interface', 'Mobile Application Design', 'Prototyping'],
    imageBase: 'kAIn-1',
    github: ' ',
    live: 'https://www.figma.com/proto/rPlg6lcGFfdD33MWG6waZ5/UX-TO-GO---KAIN?node-id=36-918&t=EkmEJSsStUOT9Z9b-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1',
    featured: false,
  },
];

export const experiences = [
  // {
  //   id: 1,
  //   role: 'Full Stack Developer',
  //   company: 'Tech Company A',
  //   period: '2024 — Present',
  //   description: 'Developing and maintaining scalable web applications. Leading frontend architecture decisions and implementing backend APIs for production systems.',
  //   technologies: ['React', 'Node.js', 'PostgreSQL'],
  // },
  {
    id: 2,
    role: 'Web Developer Intern',
    company: 'Associated Labor Unions - Luzon Region',
    period: 'Feb 2026 - May 2026',
    description: 'Developed the core LaborConnect web application with a modern, responsive interface. Project Manager & Lead Researcher of the group. Coordinated the overall research and development process. Facilitated communication with ALU, advisers, panelists, and evaluators. Oversaw time management, task delegation, and contributed to full-stack development.',
    technologies: ['React', 'Node.js', 'CSS', 'MySQL', 'n8n', "Vercel", "Railway"],
  },
  {
    id: 3,
    role: 'Freelance Technical Support & Designer',
    company: 'Self-Employed',
    period: '2019 — Present',
    description: 'Provided freelance technical support and creative design services, delivering custom PC builds, graphic designs for marketing and apparel, and professional video editing for clients and school projects.',
    technologies: ['Computer Assembly', 'Troubleshooting', 'Video Editing', 'Graphic Design', 'Figma', "Photoshop", "Premiere Pro"],
  },
];

export const education = [
  {
    id: 1,
    degree: 'College - Bachelor of Science in Information Technology',
    school: 'Technological University of the Philippines, Manila',
    period: '2022 — Present',
    description: 'Consistent President\'s Lister (A.Y. 2022-Present), 4th Placer in University Hackathon 2025',
  },
  {
    id: 2,
    degree: 'Senior High School - Science, Technology, Engineering, and Mathematics',
    school: 'San Juan de Dios Educational Foundation Inc., Pasay',
    period: '2020 — 2022',
    description: 'Graduated with High Honors, Ranked 1st in Batch and Strand Ranking (A.Y. 2020-2021)',
  },
  {
    id: 3,
    degree: 'Junior High School',
    school: 'Parañaque National High School — Baclaran, Parañaque',
    period: '2016 — 2020',
    description: 'Completed with High Honors (Valedictorian), Ranked 1st among Grade 10 students (AY. 2020)',
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
