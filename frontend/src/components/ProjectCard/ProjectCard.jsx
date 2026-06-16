import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { projectDetails } from '../../data/projectDetails';
import { useMode } from '../../context/ModeContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './ProjectCard.module.css';

const PROJECT_IMAGE_SIZES = [400, 800, 1200];
const FALLBACK_SIZE = 800;

const buildSrcSet = (base, ext) =>
  PROJECT_IMAGE_SIZES.map((size) => `/${base}-${size}.${ext} ${size}w`).join(', ');

const getSizes = () => '(max-width: 768px) 100vw, 50vw';

const isLinkAvailable = (url) => typeof url === 'string' && url.trim().length > 0;

const normalizeProjectImages = ({ imageBase, imageBases, image, images }) => {
  const sources = [];

  if (Array.isArray(imageBases)) {
    imageBases.filter(Boolean).forEach((base) => sources.push({ type: 'base', base }));
  }

  if (imageBase) {
    sources.push({ type: 'base', base: imageBase });
  }

  if (sources.length > 0) {
    return sources;
  }

  const legacyList = Array.isArray(images)
    ? images.filter(Boolean)
    : image
      ? [image]
      : [];

  return legacyList.map((src) => ({ type: 'url', src }));
};

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function LinkUnavailableModal({ linkType, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <p className={styles.modalText}>
          Sorry, there is no {linkType} link available for this project yet.
        </p>
        <button className={styles.modalClose} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

const getTechIcon = (tag, theme) => {
  const normalized = tag.toLowerCase().trim();
  
  // Inline SVG icons for reliable rendering (no CDN dependency)
  if (normalized === 'css' || normalized === 'css3') {
    return (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/>
        <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"/>
        <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h31.337l-.327 3.594-3.382 37.896H64.001V51.429z"/>
        <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.404-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"/>
        <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"/>
        <path fill="#EBEBEB" d="M64.048 23.435v13.831H33.886l-.273-3.005-.622-6.979-.331-3.847h31.388zm-.047 27.994v13.831H48.792l-.277-3.01-.616-6.966-.33-3.855h16.432z"/>
      </svg>
    );
  }

  if (normalized === 'sqlite') {
    return (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <path fill="#0b7fcc" d="M69.5 99.176c-.059-.73-.094-1.2-.094-1.2S67.2 83.087 64.57 78.642c-.414-.707.043-3.594 1.207-7.88.68 1.169 3.54 6.192 4.118 7.81.648 1.824.78 2.347.78 2.347s-1.57-8.082-4.144-12.797a162.286 162.286 0 012.004-6.265c.973 1.71 3.313 5.859 3.828 7.3.648 1.77.918 3.207.918 3.207s-1.219-7.57-3.61-12.359c3.52-18.328 15.531-42.824 27.84-53.754H16.9c-5.387 0-9.789 4.406-9.789 9.789v88.57c0 5.383 4.406 9.789 9.79 9.789h52.897a118.657 118.657 0 01-.297-14.652"/>
        <path fill="#154f7a" d="M96.648 6.293C87.098 14.977 77.5 32.602 72.44 49.629c2.633 3.906 4.61 9.07 5.97 14.437 3.508-1.465 8.59-2.344 14.367-2.344 13.184 0 23.879 4.766 23.879 10.645 0 5.878-10.695 10.648-23.879 10.648-7.3 0-13.812-1.656-17.859-4.207-.086 1.082-.156 2.152-.207 3.207 3.684 3.203 10.016 5.316 17.242 5.316 12.063 0 21.848-4.77 21.848-10.648V6.293z"/>
        <ellipse fill="#3dbaeb" cx="92.777" cy="72.367" rx="23.879" ry="10.648"/>
        <ellipse fill="#0b7fcc" cx="92.777" cy="72.367" rx="12.004" ry="5.461"/>
      </svg>
    );
  }

  if (normalized === 'vite') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="vite-grad-a" x1="6" x2="235" y1="33" y2="344" gradientTransform="translate(0 .937) scale(.3122)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#41d1ff"/>
            <stop offset="1" stopColor="#bd34fe"/>
          </linearGradient>
          <linearGradient id="vite-grad-b" x1="194.651" x2="236.076" y1="8.818" y2="292.989" gradientTransform="translate(0 .937) scale(.3122)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffea83"/>
            <stop offset=".083" stopColor="#ffdd35"/>
            <stop offset="1" stopColor="#ffa800"/>
          </linearGradient>
        </defs>
        <path fill="url(#vite-grad-a)" d="M124.766 1.686L67.393 113.148c-1.23 2.353-4.57 2.373-5.83.038L3.229 1.727C1.89-.787 4.154-3.726 6.942-3.03l56.463 14.22a3.348 3.348 0 001.64.007L121.794-3C124.577-3.716 126.852-.8 124.766 1.686z"/>
        <path fill="url(#vite-grad-b)" d="M91.026 0L52.595 7.91a1.67 1.67 0 00-1.327 1.52l-2.547 44.303a1.669 1.669 0 001.938 1.745l10.91-2.474a1.67 1.67 0 011.938 2.083l-3.243 11.155a1.67 1.67 0 001.92 2.106l6.73-1.624c1.352-.326 2.56.86 2.24 2.212L66.09 85.94c-.414 1.73 1.868 2.67 2.795 1.162l.618-1.008 34.109-68.087c.713-1.425-.513-3.034-2.083-2.718l-11.226 2.167a1.67 1.67 0 01-1.919-2.114l3.73-13.67C92.665 1.04 91.966.161 91.026 0z"/>
      </svg>
    );
  }

  if (normalized === 'javascript' || normalized === 'js') {
    return (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <path fill="#F7DF1E" d="M1.408 1.408h125.184v125.185H1.408z"/>
        <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.78-.512-2.783-.226-3.862.917-3.68 4.908-4.782 8.32-3.467 2.316.787 4.499 2.723 5.936 5.574 6.296-4.105 6.296-4.105 10.668-6.898-1.651-2.569-2.434-3.71-3.499-4.746-3.745-4.161-8.804-6.325-16.239-6.325l-4.065.476c-3.866.99-7.563 3.443-9.731 6.337-6.504 7.308-4.64 20.135 1.338 25.394 6.078 5.567 14.947 6.83 16.085 12.096.817 5.936-4.396 7.844-9.949 7.148-4.358-.692-6.75-3.017-9.37-6.967l-11.015 6.35c1.09 2.516 2.314 3.629 4.169 5.888 8.943 9.055 31.017 8.212 35.382.023 2.516-1.587 4.383-3.809 5.302-6.891.979-3.867 1.547-8.12.38-14.984zm-43.325-58.54h-13.634l-.046 30.022c0 6.38.333 12.569-2.109 15.154-2.385 4.123-7.802 3.546-10.271 2.565-2.58-1.163-3.896-2.926-5.443-5.782-1.333-2.135-2.171-3.751-2.284-3.823l-13.038 7.98c2.12 4.258 5.164 8.228 9.151 10.707 5.892 3.727 13.7 4.921 21.47 3.18 5.083-1.267 9.718-4.363 12.054-9.197 3.397-6.584 2.915-14.695 2.88-22.27l.189-28.536z"/>
      </svg>
    );
  }

  const deviconPaths = {
    'react': 'react/react-original.svg',
    'react.js': 'react/react-original.svg',
    'react native': 'react/react-original.svg',
    'next.js': 'nextjs/nextjs-original.svg',
    'next': 'nextjs/nextjs-original.svg',
    'node.js': 'nodejs/nodejs-original.svg',
    'node': 'nodejs/nodejs-original.svg',
    'express': 'express/express-original.svg',
    'express.js': 'express/express-original.svg',
    'typescript': 'typescript/typescript-original.svg',
    'ts': 'typescript/typescript-original.svg',
    'html': 'html5/html5-original.svg',
    'html5': 'html5/html5-original.svg',
    'mysql': 'mysql/mysql-original.svg',
    'tailwind css': 'tailwindcss/tailwindcss-original.svg',
    'tailwindcss': 'tailwindcss/tailwindcss-original.svg',
    'figma': 'figma/figma-original.svg',
    'electron': 'electron/electron-original.svg',
    'c++': 'cplusplus/cplusplus-original.svg',
    'c++ language': 'cplusplus/cplusplus-original.svg',
    'python': 'python/python-original.svg',
    'java': 'java/java-original.svg',
    'bootstrap': 'bootstrap/bootstrap-original.svg',
  };

  const path = deviconPaths[normalized];
  if (path) {
    return (
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`}
        alt={`${tag} logo`}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        loading="lazy"
      />
    );
  }

  if (normalized === 'n8n') {
    return (
      <svg viewBox="0 121.3 512.1 269.6" xmlns="http://www.w3.org/2000/svg" style={{ width: '85%', height: '85%' }}>
        <path 
          d="M458.1 229.1c-25.1 0-46.2-17.2-52.2-40.4h-61.8c-13.2 0-24.4 9.5-26.6 22.5l-2.2 13.3c-2 12.2-8.2 23.4-17.5 31.6 9.3 8.2 15.5 19.3 17.5 31.6l2.2 13.3c2.2 13 13.4 22.5 26.6 22.5h7.9c6-23.2 27.1-40.4 52.2-40.4 29.8 0 53.9 24.1 53.9 53.9s-24.1 53.9-53.9 53.9c-25.1 0-46.2-17.2-52.2-40.4h-7.9c-26.3 0-48.8-19-53.2-45l-2.2-13.3c-2.2-13-13.4-22.5-26.6-22.5h-21.4c-6 23.2-27.1 40.4-52.2 40.4s-46.2-17.2-52.2-40.4H106c-6 23.2-27.1 40.4-52.2 40.4C24.1 309.9 0 285.8 0 256s24.1-53.9 53.9-53.9c25.1 0 46.2 17.2 52.2 40.4h30.3c6-23.2 27.1-40.4 52.2-40.4s46.2 17.2 52.2 40.4h21.4c13.2 0 24.4-9.5 26.6-22.5l2.2-13.3c4.3-26 26.8-45 53.2-45H406c6-23.2 27.1-40.4 52.2-40.4 29.8 0 53.9 24.1 53.9 53.9s-24.2 53.9-54 53.9m0-27c14.9 0 26.9-12.1 26.9-26.9s-12.1-26.9-26.9-26.9-26.9 12.1-26.9 26.9 12 26.9 26.9 26.9M53.9 282.9c14.9 0 26.9-12.1 26.9-26.9s-12.1-26.9-26.9-26.9-27 12-27 26.9 12.1 26.9 27 26.9M215.6 256c0 14.9-12.1 26.9-26.9 26.9s-26.9-12.1-26.9-26.9 12.1-26.9 26.9-26.9 26.9 12 26.9 26.9m215.6 80.8c0 14.9-12.1 26.9-26.9 26.9-14.9 0-26.9-12.1-26.9-26.9s12.1-26.9 26.9-26.9 26.9 12.1 26.9 26.9" 
          fill="#ea4b71" 
          fillRule="evenodd" 
          clipRule="evenodd" 
        />
      </svg>
    );
  }

  if (normalized === 'expo') {
    return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '85%', height: '85%' }}>
        <path fill="currentColor" d="M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 011.248 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.046 0-.426-8.26-15.798-9.092-17.078-.8-1.23-1.044-1.498-2.397-1.542h-1.032c-1.353.044-1.597.311-2.398 1.542C8.267 3.991.33 18.758 0 19.77Z"/>
      </svg>
    );
  }

  if (normalized === 'zustand') {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', height: '90%' }}>
        {/* Head */}
        <ellipse cx="50" cy="55" rx="36" ry="32" fill="#8B6914"/>
        {/* Ears */}
        <circle cx="20" cy="28" r="13" fill="#8B6914"/>
        <circle cx="80" cy="28" r="13" fill="#8B6914"/>
        <circle cx="20" cy="28" r="8" fill="#C9973A"/>
        <circle cx="80" cy="28" r="8" fill="#C9973A"/>
        {/* Face */}
        <ellipse cx="50" cy="60" rx="24" ry="20" fill="#C9973A"/>
        {/* Eyes */}
        <circle cx="39" cy="50" r="5" fill="#1a1a1a"/>
        <circle cx="61" cy="50" r="5" fill="#1a1a1a"/>
        <circle cx="40.5" cy="48.5" r="1.5" fill="white"/>
        <circle cx="62.5" cy="48.5" r="1.5" fill="white"/>
        {/* Nose */}
        <ellipse cx="50" cy="60" rx="7" ry="4.5" fill="#5a3e1b"/>
        {/* Mouth */}
        <path d="M44 65 Q50 71 56 65" stroke="#5a3e1b" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    );
  }

  if (normalized === 'watermelondb') {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', height: '90%' }}>
        {/* Outer dark green rind */}
        <path d="M6 68 A44 44 0 0 1 94 68 Z" fill="#2E7D32"/>
        {/* Light green inner rind band */}
        <path d="M11 68 A39 39 0 0 1 89 68 Z" fill="#66BB6A"/>
        {/* White pith band */}
        <path d="M16 68 A34 34 0 0 1 84 68 Z" fill="#F1F8E9"/>
        {/* Red flesh */}
        <path d="M21 68 A29 29 0 0 1 79 68 Z" fill="#E53935"/>
        {/* Seeds */}
        <ellipse cx="50" cy="52" rx="2.5" ry="4" fill="#1B5E20"/>
        <ellipse cx="37" cy="59" rx="2.5" ry="4" fill="#1B5E20" transform="rotate(-18 37 59)"/>
        <ellipse cx="63" cy="59" rx="2.5" ry="4" fill="#1B5E20" transform="rotate(18 63 59)"/>
        <ellipse cx="43" cy="44" rx="2" ry="3.5" fill="#1B5E20" transform="rotate(-8 43 44)"/>
        <ellipse cx="57" cy="44" rx="2" ry="3.5" fill="#1B5E20" transform="rotate(8 57 44)"/>
        {/* Flat bottom edge */}
        <line x1="6" y1="68" x2="94" y2="68" stroke="#1B5E20" strokeWidth="2"/>
      </svg>
    );
  }

  if (normalized === 'reanimated') {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', height: '90%' }}>
        {/* Reanimated-style animated wave logo */}
        <defs>
          <linearGradient id="rea-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60DBFB"/>
            <stop offset="100%" stopColor="#7B5CF8"/>
          </linearGradient>
        </defs>
        {/* Circle background */}
        <circle cx="50" cy="50" r="46" fill="#0F0F1A"/>
        {/* Wave bars representing animation frames */}
        <rect x="16" y="42" width="8" height="16" rx="4" fill="url(#rea-grad)" opacity="0.5"/>
        <rect x="28" y="32" width="8" height="36" rx="4" fill="url(#rea-grad)" opacity="0.7"/>
        <rect x="40" y="22" width="8" height="56" rx="4" fill="url(#rea-grad)"/>
        <rect x="52" y="30" width="8" height="40" rx="4" fill="url(#rea-grad)" opacity="0.85"/>
        <rect x="64" y="38" width="8" height="24" rx="4" fill="url(#rea-grad)" opacity="0.65"/>
        <rect x="76" y="44" width="8" height="12" rx="4" fill="url(#rea-grad)" opacity="0.45"/>
      </svg>
    );
  }

  if (normalized === 'nativewind') {
    return (
      <img
        src="/logos/nativewind-logo.png"
        alt="NativeWind logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: theme === 'light' ? 'invert(1)' : 'none',
          mixBlendMode: theme === 'light' ? 'multiply' : 'normal'
        }}
        loading="lazy"
      />
    );
  }

  if (normalized === 'gsap') {
    return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '85%', height: '85%' }}>
        <path fill="currentColor" d="M17.21 0c-.545.003-1.084.134-1.256.367-.11.165-.192 1.196-.11 1.718 0 0 .032.345.09.614a14.6 14.6 0 0 1-.02.182 7.024 7.024 0 0 1-.097.605c-.01.056-.207.095-.425.152a2.495 2.495 0 0 0-.138-.042c-.234-.069-.385.123-.618.26-.069-.04-.371-.178-.536-.082-.165.096-.275.193-.44.261-.082-.041-.302-.041-.48.028a1.27 1.27 0 0 0-.483.278c-2.314.58-4.813 1.635-5.012 1.741-1.017.522-2.679 1.415-3.434 2.033-1.291 1.071-2.06 2.322-2.363 3.242-.385 1.14-.275 1.827.096 1.387.298-.366 1.632-1.454 2.475-1.999l-.002.007a3.219 3.219 0 0 1 .44-.26l.233-.124.505-.323c.602.552.803 1.433.937 2.63.22 1.841 1.704 2.693 3.434 2.72 1.8.028 2.446.399 3.119 1.305.153.201.318.307.47.368a1.954 1.954 0 0 0-.16.405c-.075.17-.125.38-.157.608a.157.157 0 0 0-.03.075c-.068.536-.055 1.8-.068 2.473-.014.673-.028.77-.083.866-.055.11-.11.178-.178.467-.069.302-.193.384-.316.631-.206.385-.165.81.041 1.003.206.192.77.481 1.538.385.77-.096.88-.151.756-.893-.014-.11-.192-.605-.137-.797.082-.206-.096-.563-.055-.577.041-.014.096-.288.096-.426 0-.137-.014-.796.137-1.14.062-.14.193-.46.326-.785.442-.723.459-1.161.48-1.41.03-.202.046-.46.018-.744.055-.083.289-.275.316-.646 0 0 .644-.337 1.102-1.148.16.557.31.91.286 1.272-.499.39-.684.678-.76.959-.048-.02-.076-.037-.11-.04h-.027a.437.437 0 0 0-.106.029c-.192.068-.041 1.318.165 1.827.206.508.316.81.398 1.36.083.549-.192 1.222-.302 1.524 0 0-.179.536.233.824.358.248 1.704.18 2.308.18.605 0 1.511.219 2.088.109.715-.124.824-.55.399-.77-.426-.22-1.072-.329-1.91-.933-.22-.152-.522-.289-.563-.412-.041-.124-.041-.838-.027-1.457.013-.618.22-1.414.288-1.84.064-.398-.076-.388-.262-.351.032-.147.066-.292.097-.446.344-.632.193-1.223.193-1.223.82-1.044.4-3.27.22-4.048.64.303.96.188.96.188.102-.055.192-.134.274-.224.337-.362.51-.916.51-.916V11c.782-.783 1.151-1.936.26-2.692a1.331 1.331 0 0 0-.219-1.263 1.56 1.56 0 0 0-.37-1.731 1.36 1.36 0 0 0-.487-.297c-.2-.295-.245-.417-.572-.349-.15-.165-.178-.288-.494-.178 0 0-.096-.234-.275-.289a.25.25 0 0 0-.05-.015c-.302-.21-.576-.215-.772-.16-.064-.048-.061-.124-.07-.388-.008-.2-.019-.486-.031-.744.027-.328.102-.974.126-1.303.028-.37.042-.948-.123-1.195C18.303.12 17.754-.003 17.21 0zm-.005.34c.7 0 1.002.22 1.044.343.013.028.082.495.04.797-.013.11-.027.509-.054.687-.014.179-.069.385-.124.673-.041.234-.233.495-.384.536-.261.069-.742.055-1.017 0-.069-.014-.124-.055-.192-.096-.151-.248-.234-.44-.261-.742-.028-.289-.083-.412-.096-.632-.014-.33-.014-.55-.014-.55.014-.178.069-.618.069-.659.013-.123.233-.357.989-.357zm-1.133 2.702c.146.149.301.306.432.416.124.11.426.096.7.096.248 0 .468.028.564-.027.154-.077.355-.235.523-.394.011.152.022.304.026.435.01.295-.043.468.024.57-.082.048-.174.105-.269.156-.151.08-.306.136-.403.115h-.002c-.209-.035-.931-.215-1.331-.407-.167-.259-.335-.398-.326-.448.027-.137.04-.247.054-.425.004-.03.005-.058.008-.088zm-.853.69l.035.001c.424.036.65.152.808.284l.076.03.008-.027c.047.03.102.06.162.088.47.159 1.104.308 1.309.353.247.055.645-.192.838-.316.343-.22.783-.04.989.193.137.15.192.247.192.288.316-.11.357.041.508.206.385-.179.412.041.44.137-.122 0-.298.014-.538.04l-.012-.012c-.144-.153-.402-.289-.599-.384-.087-.031-.18-.049-.252-.097-.11-.055-.22-.137-.385-.123-.687.082-.824.315-1.415.178-.577-.134-.737-.254-1.333-.221l.001.026c-.105.016-.2.03-.22.03-.206.012-.722.067-1.153-.1a1.256 1.256 0 0 0-.161-.076l-.005-.002h-.001c-.18-.07-.39-.11-.63-.112h-.026c.218-.11.356-.259.56-.218.22.041.44.22.564.357a.858.858 0 0 0-.178-.288c.128-.09.245-.229.418-.234zm-1.1.545c.15.002.28.026.417.073.018.009.034.018.059.029.288.137.81.164 1.25.137a2.26 2.26 0 0 0 .563-.095c.322.024.514.11.977.216.31.07.502.045.695-.007.193-.053.386-.13.723-.17a.542.542 0 0 1 .188.013c.038.02.075.04.11.061.062.049.214.135.343.189.164.068.59.357.645.425a.1.1 0 0 0 .038.03c.242.314.407.755.396 1.21-.06.46-.426.214-.626.12-.412-.178-.824-.302-1.305-.302-.48 0-1.099.041-1.635.179-.741.206-.961.192-1.29.027-.33-.178-.907-.618-.907-.618v.01c-.007-.007-.012-.012-.014-.01-.042.069-.138.247-.193.33-.027.522-.343 1.346-.934 1.552a.547.547 0 0 1-.467-.041 2.503 2.503 0 0 0-.55-.275c.481.384.729.673.949 1.181.174.43.415 1.017 1.002 1.646.363-.004.725.097.962.346.137.137.357.289.33.426 0 .041-.083.151-.151.234a3.231 3.231 0 0 1-.207.22c-.054.04-.247.192-.288.22-.041.027-.096.095-.137.109-.138.069-.289.014-.426-.055s.027-.082-.124-.192c-.34-.24-.541-.411-.454-.832-.932-.794-2.561-1.26-2.911-2.108-.22-.55-.248-.824-.042-1.058.605-.687.371-1.346.825-1.634.425-.275.783.04.989.33-.124-.509-.55-.633-.55-.674 0-.632.605-1.071 1.21-1.181.218-.041.389-.062.54-.06zm-1.847.534c-.14.196-.231.435-.246.721-.206.028-.673.055-.907.907a3.39 3.39 0 0 1-.214.62c-.103.045-2.946 1.274-5.229 2.542l-.01-.007c-.32.18-.627.363-.919.546l-.125.077-.001.003c-1.136.723-2.04 1.45-2.637 2.112.412-2.679 2.528-4.08 3.53-4.698 2.42-1.489 4.629-2.225 6.758-2.823zm8.037.323c.26-.004.536.06.756.275.59.577.425 1.209.247 1.648.15.179.508.687.288 1.291-.04.138-.343.138-.563.495.55-.316.893-.233 1.017.165.192.618-.234 1.36-.605 1.772 0-.014-.014-.028-.014-.041-.055.206-.123.604-.535 1.044-.206.22-.371.192-.605.137-.215-.054-.322-.142-.543-.276-.036-.207-.102-.482-.102-.59 0-.044-.004-.141-.01-.243.032-.036.066-.074.106-.114 0 0 .178-.247.44-.233.26.014.535-.041.604-.11 0-.48-.55-.494-.357-1.319.013-.04.082-.11.302-.137-.33-.069-.48-.083-.714-.302l-.013-.013c.11-.253.224-.457.301-.605.193-.385.082-.852.082-.852.207-.069.385-.179.413-.247.203-.673-.164-1.322-.605-1.74.036-.003.073-.005.11-.006zm-5.46.925c.01.016.02.033.034.05.179.22.577.495 1.113.673.26.083.467.028.7-.027 1.123-.278 2.304-.346 3.33.155a1.82 1.82 0 0 1-.157 1.068c-.232.465-.533 1.068-.48 2.215-.246.044-1.419.144-1.992.037-.521-.097-1.416-.525-1.62-.69a6.703 6.703 0 0 1-.125-.848 1.37 1.37 0 0 0 .454-.343c-.412.068-.577.04-.825-.097-.235-.13-.642-.533-.87-.82.229-.29.393-.69.335-1.226.037-.05.07-.099.102-.147zm-4.38 1.598c-.09.253.093.654.224.953.508 1.179 2.07 1.29 3.127 2.18a.723.723 0 0 0 .06.388c.083.165.371.413.371.413-.055.054-.027.164-.027.164.204.217.504.243.547.246-.435 1.248-.816 2.626-.451 4.095-.179.244-.368.445-.531.668a.851.851 0 0 1-.444-.31c-.591-.852-1.457-1.416-3.023-1.374-2.349.055-3.283-.907-3.461-2.748-.094-.974-.357-1.922-.888-2.479C7.489 9.014 9.6 7.937 10.268 7.73a2.8 2.8 0 0 0 .2-.073zm3.496.18c.381.442.795.727 1.193.979.082.343.11.577.192 1.03h-.041l-.027.308a2.836 2.836 0 0 0-.62-.113l.001-.003c-.893-1.057-.7-1.47-1.058-2.019.097-.034.225-.094.36-.182zm5.911 1.086c.076.067.178.12.323.154-.327.68.33.912.37 1.17-.143.083-.367.037-.603.025-.115-.006-.229.065-.321.147l.032-.367c.006-.43.09-.809.2-1.13zM15.79 9.947c.024.035.178.131 1.002.352 1.026.275 2.323.12 2.55.09a.378.378 0 0 1-.022.089c0 .343.055.59.096.81.053.308.13.533.163.74l.008-.007c.234 1.367.561 3.133-.267 4.048.041.192.069.467.014.783a3.204 3.204 0 0 1-.151.535 2.29 2.29 0 0 0-.108.352c-1.1.142-1.755.055-2.06-.015.123-.374.407-.754.876-.735-.022-.911-.264-1.223-.511-1.891.395-.883.299-1.665.621-2.848-.247.261-.44 1.209-.604 1.786-.206.838-.563 1.648-1.525 2.294 0 .22-.069.384-.151.494-.179.261-.412.344-.494.77.11-.138.26-.261.26-.22a8.51 8.51 0 0 1-.025.493l.012.001c-.165 1.044-.522 1.525-.742 2.115-.151.426-.096 1.36-.151 1.374-.385.083-.975-.068-1.14-.15.162-1.14.019-2.278.436-3.6l-.015-.006c.16-.554.478-.878.939-1.464-.161-.52-.532-1.64.266-4.182.033-.014.067-.03.105-.049l.206-.137c.04-.028.096-.069.137-.096.069-.042.371-.371.412-.412.096-.097.165-.124.192-.234.055-.206-.247-.412-.37-.55-.018-.019-.03-.034-.043-.05.013-.039.027-.077.042-.114.01-.125.028-.26.042-.367zm.883 7.942c.05.002.174.122.751.158.66.04 1.539-.083 1.772-.138.234-.055.097.11.069.275l-.026.169c-.399.134-1.008.188-1.416.202-.393.013-.846-.012-1.161-.11-.048-.26-.063-.47-.007-.55a.024.024 0 0 1 .018-.006zm2.506.846c-.02.135-.035.223-.058.372-.388.12-.888.122-1.27.135a4.413 4.413 0 0 1-1.012-.07 2.065 2.065 0 0 1-.033-.109 11.343 11.343 0 0 1-.065-.252c.179.034.53.079 1.15.087a4.142 4.142 0 0 0 1.288-.163zm-.106.685c-.069.44-.055 1.786-.014 2.157.014.11.948.522 1.277.77.107.085.259.157.422.222.042.042.116.105.197.203.162.213.052.436-.135.526-.264-.007-.568-.052-1.074-.128-.695-.104-1.129-.101-1.73-.106v-.003c-.152-.275-.056-.728-.056-.728a2.2 2.2 0 0 1-.809-.18l.012-.026c.234-.48.22-.591.151-1.415-.047-.578-.196-.883-.335-1.195.169.016.409.035.857.041a4.567 4.567 0 0 0 1.237-.138zm-5.306 2.084c.243 0 .6.032.676.1v.014c.014.165.165.399.11.522-.027.069-.096-.041-.192-.068.041.26.151.741.316 1.112.11.248.041.426-.33.495-.33.014-.755 0-1.112-.083-.412-.206-.55-.316-.467-.7.068-.275.494-.59.865-.838-.206.014-.426.165-.398-.014.055-.357.206-.33.302-.508-.02-.02.084-.032.23-.032z"/>
      </svg>
    );
  }

  if (normalized === 'c' || normalized === 'c language') {
    return (
      <svg viewBox="0 0 38.000089 42.000031" xmlns="http://www.w3.org/2000/svg" style={{ width: '85%', height: '85%' }}>
        <path
          fill="#004482"
          fillRule="evenodd"
          d="m 17.903,0.28628166 c 0.679,-0.381 1.515,-0.381 2.193,0 C 23.451,2.1692817 33.547,7.8372817 36.903,9.7202817 37.582,10.100282 38,10.804282 38,11.566282 c 0,3.766 0,15.101 0,18.867 0,0.762 -0.418,1.466 -1.097,1.847 -3.355,1.883 -13.451,7.551 -16.807,9.434 -0.679,0.381 -1.515,0.381 -2.193,0 -3.355,-1.883 -13.451,-7.551 -16.807,-9.434 -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 0,-3.766 0,-15.101 0,-18.867 0,-0.762 0.418,-1.466 1.097,-1.8470003 3.354,-1.883 13.452,-7.551 16.806,-9.43400004 z"
          clipRule="evenodd"
        />
        <path
          fill="#659ad2"
          fillRule="evenodd"
          d="m 0.304,31.404282 c -0.266,-0.356 -0.304,-0.694 -0.304,-1.149 0,-3.744 0,-15.014 0,-18.759 0,-0.758 0.417,-1.458 1.094,-1.8360003 3.343,-1.872 13.405,-7.507 16.748,-9.38000004 0.677,-0.379 1.594,-0.371 2.271,0.008 3.343,1.87200004 13.371,7.45900004 16.714,9.33100004 0.27,0.152 0.476,0.335 0.66,0.5760003 z"
          clipRule="evenodd"
        />
        <path
          fill="#ffffff"
          fillRule="evenodd"
          d="m 19,7.0002817 c 7.727,0 14,6.2730003 14,14.0000003 0,7.727 -6.273,14 -14,14 -7.727,0 -14,-6.273 -14,-14 0,-7.727 6.273,-14.0000003 14,-14.0000003 z m 0,7.0000003 c 3.863,0 7,3.136 7,7 0,3.863 -3.137,7 -7,7 -3.863,0 -7,-3.137 -7,-7 0,-3.864 3.136,-7 7,-7 z"
          clipRule="evenodd"
        />
        <path
          fill="#00599c"
          fillRule="evenodd"
          d="m 37.485,10.205282 c 0.516,0.483 0.506,1.211 0.506,1.784 0,3.795 -0.032,14.589 0.009,18.384 0.004,0.396 -0.127,0.813 -0.323,1.127 l -19.084,-10.5 z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  if (normalized === 'vercel') {
    return (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style={{ width: '85%', height: '85%' }}>
        <polygon points="256,130 396,366 116,366" fill="currentColor" stroke="currentColor" strokeWidth="30" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalized === 'railway') {
    return (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" style={{ width: '85%', height: '85%' }}>
        <path d="M2.368 219.093A260.486 260.486 0 000 244.864h388.907a44.635 44.635 0 00-5.035-7.381c-66.475-85.888-102.25-78.443-153.387-80.64-17.066-.683-28.65-.982-96.533-.982-36.352 0-75.84.107-114.325.214-4.971 13.44-9.771 26.453-12.118 37.056h199.296v25.962H2.347h.021zm389.59 51.755H.213c.427 6.933 1.067 13.76 2.006 20.501h361.685c16.128 0 25.152-9.152 28.075-20.48l-.021-.02zM22.507 362.155S82.453 509.398 255.723 512c103.552 0 192.533-61.504 232.96-149.845H22.507z" fill="currentColor" />
        <path d="M255.723 0C160 0 76.65 52.587 32.66 130.304c34.368-.064 101.334-.107 101.334-.107h.021v-.02c79.147 0 82.09.34 97.557.98l9.6.363c33.323 1.11 74.326 4.693 106.582 29.099 17.493 13.226 42.773 42.453 57.856 63.253 13.93 19.243 17.92 41.387 8.448 62.592-8.704 19.477-27.456 31.104-50.176 31.104H8.32s2.133 8.96 5.29 18.88h485.334c8.619-25.92 12.992-53.035 13.014-80.341C512 114.667 397.29 0 255.744 0h-.021z" fill="currentColor" />
      </svg>
    );
  }

  if (normalized === 'c' || normalized === 'c language') {
    return (
      <svg viewBox="0 0 38.000089 42.000031" xmlns="http://www.w3.org/2000/svg" style={{ width: '85%', height: '85%' }}>
        <path
          fill="#004482"
          fillRule="evenodd"
          d="m 17.903,0.28628166 c 0.679,-0.381 1.515,-0.381 2.193,0 C 23.451,2.1692817 33.547,7.8372817 36.903,9.7202817 37.582,10.100282 38,10.804282 38,11.566282 c 0,3.766 0,15.101 0,18.867 0,0.762 -0.418,1.466 -1.097,1.847 -3.355,1.883 -13.451,7.551 -16.807,9.434 -0.679,0.381 -1.515,0.381 -2.193,0 -3.355,-1.883 -13.451,-7.551 -16.807,-9.434 -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 0,-3.766 0,-15.101 0,-18.867 0,-0.762 0.418,-1.466 1.097,-1.8470003 3.354,-1.883 13.452,-7.551 16.806,-9.43400004 z"
          clipRule="evenodd"
        />
        <path
          fill="#659ad2"
          fillRule="evenodd"
          d="m 0.304,31.404282 c -0.266,-0.356 -0.304,-0.694 -0.304,-1.149 0,-3.744 0,-15.014 0,-18.759 0,-0.758 0.417,-1.458 1.094,-1.8360003 3.343,-1.872 13.405,-7.507 16.748,-9.38000004 0.677,-0.379 1.594,-0.371 2.271,0.008 3.343,1.87200004 13.371,7.45900004 16.714,9.33100004 0.27,0.152 0.476,0.335 0.66,0.5760003 z"
          clipRule="evenodd"
        />
        <path
          fill="#ffffff"
          fillRule="evenodd"
          d="m 19,7.0002817 c 7.727,0 14,6.2730003 14,14.0000003 0,7.727 -6.273,14 -14,14 -7.727,0 -14,-6.273 -14,-14 0,-7.727 6.273,-14.0000003 14,-14.0000003 z m 0,7.0000003 c 3.863,0 7,3.136 7,7 0,3.863 -3.137,7 -7,7 -3.863,0 -7,-3.137 -7,-7 0,-3.864 3.136,-7 7,-7 z"
          clipRule="evenodd"
        />
        <path
          fill="#00599c"
          fillRule="evenodd"
          d="m 37.485,10.205282 c 0.516,0.483 0.506,1.211 0.506,1.784 0,3.795 -0.032,14.589 0.009,18.384 0.004,0.396 -0.127,0.813 -0.323,1.127 l -19.084,-10.5 z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  
  return (
    <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'inherit', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
      {tag.substring(0, 2)}
    </span>
  );
};

function ProjectCard({ project }) {
  const { title, description, tags, github, live, featured } = project;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [modalLinkType, setModalLinkType] = useState(null);
  const [isTouched, setIsTouched] = useState(false);
  const touchStartY = useRef(null);
  const touchScrolled = useRef(false);
  const imageSources = normalizeProjectImages(project);
  const sizes = getSizes();
  const navigate = useNavigate();
  const { triggerTransition } = useMode();
  const { theme } = useTheme();

  const hasGithub = isLinkAvailable(github);
  const hasLive = isLinkAvailable(live);

  // Find slug for the project (if it exists in projectDetails)
  const detailSlug = (projectDetails.find(
    (p) =>
      p.name.toLowerCase() === title.toLowerCase() ||
      (p.cardTitle && p.cardTitle.toLowerCase() === title.toLowerCase())
  ) || {}).id;

  useEffect(() => {
    if (imageSources.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % imageSources.length);
    }, 3500); // Change image every 3.5 seconds

    return () => clearInterval(interval);
  }, [imageSources.length]);

  const handleUnavailableLink = (e, type) => {
    e.preventDefault();
    setModalLinkType(type);
  };

  const handleCardClick = (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (detailSlug) {
      triggerTransition(() => {
        sessionStorage.setItem('portfolio_scroll_pos', window.scrollY);
        navigate(`/portfolio/projects/${detailSlug}`);
      });
    }
  };

  return (
    <div className={styles.projectWrapper}>
      <article
        className={`${styles.projectCard} ${detailSlug ? styles.clickable : ''} ${isTouched ? styles.touched : ''}`}
        onClick={handleCardClick}
        role={detailSlug ? 'link' : undefined}
        tabIndex={detailSlug ? 0 : undefined}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && detailSlug) {
            e.preventDefault();
            navigate(`/portfolio/projects/${detailSlug}`);
          }
        }}
      >
        {/* Floating Type Pill on Hover */}
        {project.type && (
          <div className={styles.typePopup}>
            <span className={styles.typeText}>{project.type}</span>
            <div className={styles.typeLine}>
              <span className={styles.ripple} />
              <span className={styles.ripple} />
              <span className={styles.ripple} />
            </div>
          </div>
        )}
        {/* Inner Container to clip the glare effect and apply rounded corners */}
        <div className={styles.cardInner}>
          {/* Image / Slideshow */}
          <div className={styles.imageArea}>
            {imageSources.length > 0 ? (
              <>
                {imageSources.map((source, idx) => {
                  const isActive = idx === currentIdx;
                  const imgClassName = `${styles.projectImg} ${isActive ? styles.projectImgActive : ''}`;
                  const altText = `${title} screenshot ${idx + 1}`;

                  if (source.type === 'base') {
                    return (
                      <picture key={`${source.base}-${idx}`} className={styles.projectPicture}>
                        <source
                          type="image/webp"
                          srcSet={buildSrcSet(source.base, 'webp')}
                          sizes={sizes}
                        />
                        <img
                          src={`/${source.base}-${FALLBACK_SIZE}.jpg`}
                          srcSet={buildSrcSet(source.base, 'jpg')}
                          sizes={sizes}
                          alt={altText}
                          className={imgClassName}
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    );
                  }

                  return (
                    <img
                      key={`${source.src}-${idx}`}
                      src={source.src}
                      alt={altText}
                      className={imgClassName}
                      loading="lazy"
                      decoding="async"
                    />
                  );
                })}

                {/* Navigation Dots if multiple images */}
                {imageSources.length > 1 && (
                  <div className={styles.dotsContainer}>
                    {imageSources.map((_, idx) => (
                      <span
                        key={idx}
                        className={`${styles.dot} ${idx === currentIdx ? styles.dotActive : ''
                          }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <span className={styles.imagePlaceholder}>{title.charAt(0)}</span>
            )}
          </div>

          {/* Content */}
          <div className={styles.content}>
            {featured && <span className={styles.featured}>Featured</span>}
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>

            {/* Footer Area with tech badges and action links */}
            <div className={styles.cardFooter}>
              {/* Tech Badges */}
              {tags && tags.length > 0 && (
                <div className={styles.techBadges}>
                  {tags.map((tag, idx) => (
                    <div key={`${tag}-${idx}`} className={styles.techBadgeCircle} title={tag}>
                      {getTechIcon(tag, theme)}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Links */}
              <div className={styles.actionLinks}>
                {detailSlug && (
                  <button
                    className={styles.detailCircleBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerTransition(() => {
                        sessionStorage.setItem('portfolio_scroll_pos', window.scrollY);
                        navigate(`/portfolio/projects/${detailSlug}`);
                      });
                    }}
                    onTouchStart={(e) => {
                      touchStartY.current = e.touches[0].clientY;
                      touchScrolled.current = false;
                      setIsTouched(true);
                    }}
                    onTouchMove={(e) => {
                      if (touchStartY.current === null) return;
                      const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
                      if (deltaY > 8) {
                        touchScrolled.current = true;
                        setIsTouched(false);
                      }
                    }}
                    onTouchEnd={() => {
                      setIsTouched(false);
                      touchStartY.current = null;
                    }}
                    onTouchCancel={() => {
                      setIsTouched(false);
                      touchStartY.current = null;
                    }}
                    title="View Project Details"
                    aria-label="View details"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Link Unavailable Modal */}
        {modalLinkType && (
          <LinkUnavailableModal
            linkType={modalLinkType}
            onClose={() => setModalLinkType(null)}
          />
        )}
      </article>
    </div>
  );
}

export default ProjectCard;
