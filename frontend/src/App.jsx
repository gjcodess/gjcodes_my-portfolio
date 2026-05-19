import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GridBackground from './components/GridBackground/GridBackground';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';

import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Projects from './sections/Projects/Projects';
import Experience from './sections/Experience/Experience';
import Services from './sections/Services/Services';
import Contact from './sections/Contact/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader />
      <GridBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
