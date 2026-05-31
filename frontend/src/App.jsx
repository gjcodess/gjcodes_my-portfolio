import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import { ModeProvider, useMode } from './context/ModeContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import GridBackground from './components/GridBackground/GridBackground';
import KineticGridBackground from './components/KineticGridBackground/KineticGridBackground';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
import ModeSwitcher from './components/ModeSwitcher/ModeSwitcher';
import ModeTransition from './components/ModeTransition/ModeTransition';

// Portfolio sections
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Projects from './sections/Projects/Projects';
import Experience from './sections/Experience/Experience';
import Services from './sections/Services/Services';
import Contact from './sections/Contact/Contact';

// Personal sections
import PersonalHero from './sections/PersonalHero/PersonalHero';
import Hobbies from './sections/Hobbies/Hobbies';
import Favorites from './sections/Favorites/Favorites';
import Gallery from './sections/Gallery/Gallery';
import Quotes from './sections/Quotes/Quotes';
import ProjectDetail from './sections/ProjectDetail/ProjectDetail';

gsap.registerPlugin(ScrollTrigger);

function PortfolioContent() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Contact />
    </>
  );
}

function PersonalContent() {
  return (
    <>
      <PersonalHero />
      <Hobbies />
      <Favorites />
      <Gallery />
      <Quotes />
    </>
  );
}

function AppContent() {
  const { mode, isKineticGridDisabled } = useMode();
  const { theme } = useTheme();

  const location = useLocation();

  // Scroll to top and refresh ScrollTrigger on mode change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Kill existing ScrollTrigger instances then refresh after new content mounts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [mode]);

  // Initial ScrollTrigger refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ModeTransition />
      <Loader />
      <KineticGridBackground
        gridSize={60}
        interactionRadius={200}
        strength={30}
        damping={0.15}
        lineColor={theme === 'light' ? 'rgba(13, 148, 136, 0.08)' : 'rgba(0, 255, 153, 0.06)'}
        highlightColor={theme === 'light' ? 'rgba(13, 148, 136, 0.5)' : 'rgba(0, 255, 153, 0.7)'}
        highlightLineWidth={1.5}
        lineWidth={1}
        disabled={isKineticGridDisabled}
      />
      <Navbar />
      <main>
        <div style={{ display: location.pathname === '/portfolio' ? 'block' : 'none' }}>
          <PortfolioContent />
        </div>
        
        <div style={{ display: location.pathname === '/personal' ? 'block' : 'none' }}>
          <PersonalContent />
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/portfolio" replace />} />
          <Route path="/portfolio/projects/:slug" element={<ProjectDetail />} />
          <Route path="/portfolio" element={null} />
          <Route path="/personal" element={null} />
          <Route path="*" element={<Navigate to="/portfolio" replace />} />
        </Routes>
      </main>
      <Footer />
      <ModeSwitcher />
      <Analytics />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ModeProvider>
        <AppContent />
      </ModeProvider>
    </ThemeProvider>
  );
}

export default App;
