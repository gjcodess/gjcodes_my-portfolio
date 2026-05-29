import React from 'react';

// Dictionary mapping technology names to their details (icon, brand color, primary level)
export const techMap = {
  // --- FRONTEND ---
  'React.js': {
    color: '#61DAFB',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="-11.5 -10.23 23 20.46" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
        <circle r="2.05" fill="currentColor" />
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </svg>
    ),
  },
  'Next.js': {
    color: '#FFFFFF',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.17 18.23l-5.91-7.7v7.7H9.74V5.77h1.52l5.9 7.69V5.77h1.52v12.46h-1.51z" />
      </svg>
    ),
  },
  'HTML5': {
    color: '#E34F26',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.625h10.438l.232-2.625H6.063l.695 7.875h7.457l-.294 3.324-2.72 1.157-2.684-1.157-.179-2.022H5.73l.363 4.103 5.86 2.505 5.86-2.505.74-8.381H8.531z" />
      </svg>
    ),
  },
  'CSS3': {
    color: '#1572B6',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.025 5.75H8.62l.23 2.625h7.675l-.23 2.625H9.313l.23 2.625h6.75l-.575 6.45-4.475 1.838-4.475-1.838-.24-2.75H8.3l.113 1.325 2.337.962 2.337-.962.243-2.7h-7.65L5.4 5.75h13.125z" />
      </svg>
    ),
  },
  'JavaScript': {
    color: '#F7DF1E',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M0 0h24v24H0V0zm20.06 17.5c0-.98-.59-1.68-1.76-2.16-.78-.3-1.37-.5-1.37-.96 0-.38.3-.68.88-.68.59 0 .98.2 1.27.68l1.47-.98c-.49-.88-1.37-1.37-2.74-1.37-1.66 0-2.74.98-2.74 2.35 0 1.37.98 1.96 2.25 2.45.98.39 1.37.59 1.37 1.08 0 .49-.39.78-1.08.78-.88 0-1.37-.39-1.66-1.08l-1.57.98c.49 1.08 1.66 1.76 3.23 1.76 1.96 0 2.94-.98 2.94-2.45zm-8.82-.2c0-1.18-.78-1.76-1.96-2.06l-1.18-.29c-.39-.1-.59-.29-.59-.59 0-.29.3-.49.68-.49.49 0 .78.2.98.59l1.37-.88c-.39-.68-1.18-1.18-2.35-1.18-1.57 0-2.55.88-2.55 2.16 0 .98.68 1.57 1.76 1.86l1.08.29c.49.1.68.39.68.68 0 .39-.3.59-.88.59-.59 0-.98-.29-1.18-.78l-1.47.88c.39.88 1.37 1.47 2.65 1.47 1.66 0 2.64-.88 2.64-2.25z" />
      </svg>
    ),
  },
  'Bootstrap': {
    color: '#7952B3',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.18 0H5.82A5.82 5.82 0 000 5.82v12.36A5.82 5.82 0 005.82 24h12.36a5.82 5.82 0 005.82-5.82V5.82A5.82 5.82 0 0018.18 0zM15.42 13.5c0 1.25-.49 2.22-1.46 2.92-.98.71-2.31 1.06-4 .1H6v-13h3.94c1.63 0 2.92.35 3.86 1.05.94.7 1.41 1.7 1.41 2.99 0 1.01-.33 1.83-1 2.45.85.34 1.5.94 1.95 1.79s.67 1.89.67 3.14l-.41.56zm-6.27-3.92h2.24c.75 0 1.34-.18 1.76-.55s.63-.9.63-1.6-.21-1.22-.63-1.55-1.01-.5-1.76-.5H9.15v4.2zm0 5.92H11.7c.85 0 1.52-.2 2-.6s.71-.97.71-1.71c0-.75-.24-1.31-.71-1.7s-1.15-.58-2-.58H9.15V15.5z" />
      </svg>
    ),
  },

  // --- BACKEND ---
  'Node.js': {
    color: '#339933',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0c-.36 0-.7.19-.9.51L1.44 6.09c-.36.21-.57.59-.57.99v11.66c0 .41.21.79.57 1L11.1 23.5c.2.31.54.5.9.5.36 0 .7-.19.9-.5l9.66-5.76c.36-.21.57-.59.57-1V7.08c0-.4-.21-.78-.57-.99L12.9.51c-.2-.32-.54-.51-.9-.51zm-1.8 17.5v-3.96c0-.41.21-.79.57-1L15.3 9.77c.36-.21.57-.59.57-1v-3.8c0-.4-.21-.79-.57-1L12.9 2.47c-.2-.32-.54-.5-.9-.5s-.7.18-.9.5l-2.4 1.5c-.36.21-.57.59-.57.99V16c0 .41.21.79.57 1l2.4 1.5c.2.31.54.5.9.5s.7-.19.9-.5l2.4-1.5c.36-.21.57-.59.57-1v-3.96" />
      </svg>
    ),
  },
  'Express.js': {
    color: '#E5E7EB',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.25 17.25H6.25v-10.5h4.5v2.25H8.5v1.88h2v2.25H8.5V15h2.25v2.25zm7 0h-2.38l-1.37-2.38-1.37 2.38h-2.38l2.55-4.13-2.38-3.87h2.38l1.2 2.12 1.2-2.12h2.38l-2.38 3.87 2.55 4.13z" />
      </svg>
    ),
  },
  'Python': {
    color: '#3776AB',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M11.97 0C5.36 0 5 4.67 5 5v2.33h7V8.5H5.06c-2.78 0-5.06 2.22-5.06 5s2.28 5 5.06 5H6.9v-2.61a3.29 3.29 0 013.3-3.29h5.7a3.29 3.29 0 013.3 3.29v2.61h1.8c2.78 0 5.06-2.22 5.06-5v-5.67c0-2.78-2.28-5-5.06-5H17V5C17 2.22 14.73 0 11.97 0zm-3.3 2.37a.89.89 0 110 1.78.89.89 0 010-1.78zm9.14 17.5a.89.89 0 110 1.78.89.89 0 010-1.78z" />
      </svg>
    ),
  },
  'REST APIs': {
    color: '#00FF99',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
        <path d="M16 6h2" />
        <path d="M16 18h2" />
      </svg>
    ),
  },

  // --- DATABASE ---
  'MySQL': {
    color: '#4479A1',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.91 10.422c-.225-.382-.572-.736-.938-1.047-.424-.36-.967-.674-1.48-.894.275.485.352 1.135.215 1.688-.13.52-.455 1.002-.8 1.3-.7.6-1.8.72-2.6.28-.5-.3-.8-.85-.8-1.4 0-.3.1-.6.3-.9-1.5 1-2.4 2.8-2.4 4.8 0 3.1 2.5 5.6 5.6 5.6.8 0 1.6-.17 2.35-.48-.12.83-.52 1.6-1.18 2.18-.7.6-1.8.72-2.6.28-.5-.3-.8-.85-.8-1.4 0-.3.1-.62.3-.9A12 12 0 004 12c0 6.627 5.373 12 12 12 2.65 0 5.1-.86 7.1-2.3l-3.3-3.3c-.92.68-2.07 1.08-3.3 1.08-3.038 0-5.5-2.462-5.5-5.5 0-.46.06-.9.17-1.32h4c.46 0 .9-.06 1.32-.17l3.3 3.3c1.44-2 2.3-4.45 2.3-7.1 0-2.65-.86-5.1-2.3-7.1l-3.6 4.9z" />
      </svg>
    ),
  },
  'PostgreSQL': {
    color: '#4169E1',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19.123 11.23c.123-.42.173-.872.173-1.332 0-4.432-3.593-8.025-8.025-8.025h-5.91v3.136c0 1.705.677 3.34 1.884 4.547 1.206 1.206 2.842 1.883 4.547 1.883h1.163c.414 0 .75.336.75.75v1.854c0 1.343-.545 2.63-1.514 3.6-.968.968-2.257 1.514-3.6 1.514H5.36v3.136H8.8c2.812 0 5.508-1.117 7.502-3.11 2-2 3.117-4.69 3.117-7.502v-1.854c.264-.325.485-.694.622-1.107z" />
      </svg>
    ),
  },
  'NeonDB': {
    color: '#00E599',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
        <polyline points="12 22 12 12 22 8.5" />
        <polyline points="12 12 2 8.5" />
      </svg>
    ),
  },
  'Supabase': {
    color: '#3ECF8E',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.362 11.606l-8.291-9.53a1.047 1.047 0 00-1.124-.263 1.042 1.042 0 00-.655.975v7.697H4.638a1.047 1.047 0 00-1.018 1.293l8.291 9.53a1.047 1.047 0 001.78-.71v-7.697h6.653a1.047 1.047 0 001.018-1.295z" />
      </svg>
    ),
  },

  // --- DEVOPS & TOOLS ---
  'Git': {
    color: '#F05032',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.2 10.8L13.2.8c-.4-.4-1-.4-1.4 0l-3 3 3.3 3.3c.7-.2 1.5 0 2.5.5.6.6.8 1.4.5 2.1l3.3 3.3c.7-.2 1.5 0 2 .5.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.6-.6-.8-1.4-.5-2.1l-3.3-3.3c-.2.1-.4.2-.6.2-.2 0-.4-.1-.5-.2l-2.6 2.6c.1.3.1.6.1.9 0 1.2-.9 2.1-2.1 2.1-1.2 0-2.1-.9-2.1-2.1s.9-2.1 2.1-2.1c.3 0 .6.1.9.1l2.6-2.6c-.1-.2-.2-.4-.2-.5s.1-.4.2-.5L6.5 5.2.8 10.9c-.4.4-.4 1 0 1.4l10.3 10.3c.4.4 1.1.4 1.5 0l10.7-10.7c.4-.4.4-1.1 0-1.5z" />
      </svg>
    ),
  },
  'Linux': {
    color: '#FCC624',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 .002c-3.1 0-5.8 2-6.5 4.8-.4 1.7-.1 3.5.8 4.9.4.6 1.1 1.2 1.7 1.6-.1.3-.2.6-.2 1 0 .9.5 1.7 1.2 2.1.2 1 .8 1.8 1.6 2.3v3.9c-2 .3-3.7 1.3-4.6 3-.2.3-.2.7 0 1 .2.3.5.5.9.5h14c.4 0 .7-.2.9-.5.2-.3.2-.7 0-1-.9-1.7-2.6-2.7-4.6-3v-3.9c.8-.5 1.4-1.3 1.6-2.3.7-.4 1.2-1.2 1.2-2.1 0-.4-.1-.7-.2-1 .6-.4 1.3-1 1.7-1.6.9-1.4 1.2-3.2.8-4.9-.7-2.8-3.4-4.8-6.5-4.8zm-1.8 4.5c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zm3.6 0c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1z" />
      </svg>
    ),
  },
  'Vercel': {
    color: '#FFFFFF',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M24 22.525H0L12 1.475l12 21.05z" />
      </svg>
    ),
  },
  'Railway': {
    color: '#F000B8',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5 16h-4l-3-4H8v4H5V8h5l3 4h1V8h3v8z" />
      </svg>
    ),
  },
  'GitHub Actions': {
    color: '#2088FF',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 1.3 18.3 1.6 18.3 1.6c.8 1.6.3 2.8.1 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 21.8 24 17.3 24 12c0-6.6-5.4-12-12-12z" />
      </svg>
    ),
  },
  'n8n Automation': {
    color: '#FF6C37',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.5 13.5c-1.38 0-2.5 1.12-2.5 2.5 0 .21.03.41.08.61l-5.61-3.21a2.49 2.49 0 000-2.8l5.61-3.21c-.05.2-.08.4-.08.61 0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5c0 .21.03.41.08.61L9.97 9.42a2.49 2.49 0 000 5.16l6.11 3.49c-.05-.2-.08-.4-.08-.61 0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm-13 3c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },

  // --- DESIGN ---
  'Figma': {
    color: '#F24E1E',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M8.5 24C6 24 4 22 4 19.5S6 17 8.5 17H12v7H8.5zM4 12.5C4 10 6 8 8.5 8H12v9H8.5C6 17 4 15 4 12.5zM4 5.5C4 3 6 1 8.5 1H12v7H8.5C6 8 4 6 4 5.5zM12 1H15.5C18 1 20 3 20 5.5S18 8 15.5 8H12V1zm3.5 7C18 8 20 10 20 12.5S18 17 15.5 17H12V8h3.5z" />
      </svg>
    ),
  },
  'Adobe Suite': {
    color: '#FF0000',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M13.9 2h8.1v20h-8.1zM2 2h8.1v20H2zm8 4.7h4L12 14z" />
      </svg>
    ),
  },
  'Responsive Design': {
    color: '#0EA5E9',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  'UI/UX': {
    color: '#00FF99',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  'Canva': {
    color: '#00C4CC',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },

  // --- OTHER ---
  'Computer assembly': {
    color: '#00FF99',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="3" width="14" height="11" rx="2" />
        <line x1="9" y1="14" x2="9" y2="18" />
        <line x1="5" y1="18" x2="13" y2="18" />
        <rect x="19" y="3" width="3" height="15" rx="1" />
        <circle cx="20.5" cy="5.5" r="0.5" fill="currentColor" />
        <line x1="19" y1="15" x2="22" y2="15" />
      </svg>
    ),
  },
  'Troubleshooting': {
    color: '#F59E0B',
    isPrimary: true,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  'Networking': {
    color: '#3B82F6',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M12 8v8M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      </svg>
    ),
  },
  'Basic hardware knowledge': {
    color: '#9CA3AF',
    isPrimary: false,
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
      </svg>
    ),
  },
};
