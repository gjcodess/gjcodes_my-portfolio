import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ModeProvider, useMode } from './context/ModeContext';

import GridBackground from './components/GridBackground/GridBackground';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
import ModeSwitcher from './components/ModeSwitcher/ModeSwitcher';
import ModeTransition from './components/ModeTransition/ModeTransition';

// Corporate sections
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
import LifeComponents from './sections/LifeComponents/LifeComponents';
import Gallery from './sections/Gallery/Gallery';
import Quotes from './sections/Quotes/Quotes';

gsap.registerPlugin(ScrollTrigger);

function CorporateContent() {
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
      <LifeComponents />
      <Gallery />
      <Quotes />
    </>
  );
}

function AppContent() {
  const { mode } = useMode();

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
      <GridBackground />
      <Navbar />
      <main key={mode}>
        {mode === 'corporate' ? <CorporateContent /> : <PersonalContent />}
      </main>
      <Footer />
      <ModeSwitcher />
    </>
  );
}

function App() {
  return (
    <ModeProvider>
      <AppContent />
    </ModeProvider>
  );
}

export default App;
