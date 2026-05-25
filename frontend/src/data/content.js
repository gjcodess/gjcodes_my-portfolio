/* ============================================
   Placeholder Content Data
   Replace this file with your real content
   ============================================ */

export const personalInfo = {
  name: 'Glenn Joshua Corpus',
  lastName: 'Corpus',
  role: 'IT Student | Aspiring Web Developer ',
  tagline: 'Soon-to-be BSIT Graduate | Pragmatic & Delivery-oriented | Tech Enthusiast',
  bio: `I build clean, scalable, and reliable web applications rooted in a deep understanding of computer systems and hardware. Passionate about crafting digital experiences that combine technical precision with thoughtful design. Focused on delivering production-ready systems that make a real impact.`,
  email: 'glennjoshuacorpus@gmail.com',
  location: 'Philippines, Parañaque City',
  currentPosition: 'Soon-to-be IT Graduate',
  resumeUrl: '/Resume-Glenn.pdf',
  avatar: '\my-photo.jpg',
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
    tags: ['React', 'Node.js', 'CSS', 'MySQL'],
    imageBases: ['Gcorp-1', 'Gcorp-2', 'Gcorp-3'],
    github: 'https://github.com/imapoopzz/WebDev_Project',
    live: ' ',
    featured: true,
  },

  {
    id: 4,
    title: 'kAIn',
    description: 'KAIN (a Filipino word for “eat”) is a smart, intuitive mobile application that helps users effortlessly track their daily food intake, monitor nutrition, and build healthier eating habits with the assistance of Artificial Intelligence.',
    tags: ['Figma', 'User Interface', 'Mobile Application Design', 'Prototyping'],
    imageBase: 'kAIn-1',
    github: ' ',
    live: 'https://www.figma.com/proto/rPlg6lcGFfdD33MWG6waZ5/UX-TO-GO---KAIN?node-id=36-918&t=EkmEJSsStUOT9Z9b-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1',
    featured: true,
  },

  {
    id: 5,
    title: 'CSSGen',
    description: 'Visually create advanced CSS effects with real-time previews, instant code generation, and one-click export. Built for developers who want precision without the hassle.',
    tags: ['React', 'CSS', 'JavaScript', 'HTML'],
    imageBases: ['CSSGen-1', 'CSSGen-2', 'CSSGen-3', 'CSSGen-4'],
    github: 'https://github.com/imapoopzz/css-generator',
    live: 'https://css-generator-gamma.vercel.app/',
    featured: false,
  },

  {
    id: 6,
    title: 'Sorting Algorithms Visualization',
    description: 'A full-stack sorting algorithms visualizer web app with interactive animations, adjustable speed and controls, and an API-backed random array generator for learning and demonstrations.',
    tags: ['React', 'CSS', 'JavaScript', 'HTML'],
    imageBases: ['SortingAlgo-1', 'SortingAlgo-2', 'SortingAlgo-3'],
    github: 'https://github.com/imapoopzz/SortingAlgo',
    live: 'https://sorting-algo-visualizer-smoky.vercel.app/',
    featured: false,
  },

  {
    id: 7,
    title: 'TUP - Academic Information System (AIS)',
    description: 'A console-based student grading system in C featuring an interactive menu, student record input and file storage, weighted grade calculations, class statistics and summaries, and printable reports for instructors and demonstrations.',
    tags: ['C Language'],
    imageBase: 'TupAis-1',
    github: ' ',
    live: ' ',
    featured: false,
  },

  {
    id: 8,
    title: 'Two-dimensional puzzle game: 2048',
    description: 'A compact, console-based C game with responsive keyboard controls, ASCII-style visuals, randomized levels/challenges, score and lives tracking, and optional high-score persistence for classroom demos and beginner game-development practice.',
    tags: ['C Language'],
    imageBase: '2048-1',
    github: ' ',
    live: ' ',
    featured: false,
  },

  {
    id: 9,
    title: 'ATM Simulator',
    description: 'A console-based ATM simulation in C++ implementing ADT list operations with account registration, encrypted PIN handling, file-backed persistence, balance inquiry, withdraw/deposit, fund transfer, PIN change, an interactive keypad-style UI, and transaction logging for demonstrations and learning.',
    tags: ['C++ Language'],
    imageBase: 'ATM-1',
    github: ' ',
    live: ' ',
    featured: false,
  },

  {
    id: 10,
    title: 'Arithmetic Practice Game',
    description: 'An object-oriented C++ arithmetic-practice game with linked-list player management, secure login, per-operation scoring (add/sub/mul/div), Top-10 leaderboard and averages, file-backed persistence, interactive console UI, and reusable modules for classroom demonstrations and skill-building.',
    tags: ['C++ Language', 'Object-Oriented Programming'],
    imageBase: 'Arith-1',
    github: ' ',
    live: ' ',
    featured: false,
  },
];

export const experiences = [
  // {
  //   id: 1,
  //   role: 'Full Stack Developer',
  //   company: 'Tech Company A',
  //   period: '2026 — Present',
  //   description: 'Developing and maintaining scalable web applications. Leading frontend architecture decisions and implementing backend APIs for production systems.',
  //   technologies: ['React', 'Node.js', 'PostgreSQL'],
  // },
  {
    id: 2,
    role: 'Web Developer Intern',
    company: 'Associated Labor Unions - Luzon Region',
    period: 'Feb 2026 - May 2026',
    description: 'Developed the core LaborConnect web application with a modern, responsive interface. Project Manager & Lead Researcher of the group. Coordinated the overall research and development process. Oversaw time management, task delegation, and contributed to full-stack development.',
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
    description: 'Consistent President\'s Lister (A.Y. 2022-Present), 4th Placer in University Hackathon 2025, 2nd Placer in Best Capstone Project 2026',
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
    description: 'Completed with High Honors (Valedictorian), Ranked 1st among Grade 10 students (A.Y. 2020)',
  },

];

export const services = [
  {
    title: 'Full-Stack Development',
    description: 'Developing end-to-end web applications using React.js, Node.js, and HTML/CSS, with robust server integration.',
    icon: 'Code2',
  },
  {
    title: 'UI/UX Interface Design',
    description: 'Designing intuitive, user-friendly mobile and web interfaces with Figma, focusing on custom wireframing and prototyping.',
    icon: 'Palette',
  },
  {
    title: 'Database Management',
    description: 'Designing relational database schemas with MySQL, optimization of queries, and ensuring reliable data persistence.',
    icon: 'Database',
  },
  {
    title: 'Hardware & IT Support',
    description: 'Hands-on experience in computer assembly, operating system setup (Windows/Ubuntu), and technical troubleshooting.',
    icon: 'Cpu',
  },
  {
    title: 'Creative Media Design',
    description: 'Creating graphic designs for marketing and apparel alongside professional video editing for projects.',
    icon: 'Video',
  },
  {
    title: 'Project Leadership',
    description: 'Leading technical teams, delegating tasks, managing time tables, and guiding projects to successful delivery.',
    icon: 'ClipboardList',
  },
];

export const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Completed' },
  { value: '20+', label: 'Technologies' },
  { value: '100%', label: 'Commitment' },
];
