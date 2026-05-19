import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ModeContext = createContext(null);

const TITLES = {
  corporate: 'Corporate | Glenn Joshua Corpus',
  personal: 'Personal | Glenn Joshua Corpus',
};

const STORAGE_KEY = 'portfolio-mode';

export function ModeProvider({ children }) {
  const [mode, setModeState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'personal' ? 'personal' : 'corporate';
    } catch {
      return 'corporate';
    }
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('');

  // Persist mode to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // localStorage unavailable — silent fail
    }
  }, [mode]);

  // Update document title reactively
  useEffect(() => {
    document.title = TITLES[mode];
  }, [mode]);

  const setMode = useCallback((newMode) => {
    if ((newMode !== 'corporate' && newMode !== 'personal') || newMode === mode || isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setTransitionText(
      newMode === 'personal' ? 'Entering Personal Space...' : 'Entering Corporate Space...'
    );

    // Wait for all 6 panels to fully cover the screen (approx 600ms)
    setTimeout(() => {
      setModeState(newMode);
    }, 600);

    // Begin exit sequence shortly after content has swapped (650ms)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 650);
  }, [mode, isTransitioning]);

  const toggleMode = useCallback(() => {
    const nextMode = mode === 'corporate' ? 'personal' : 'corporate';
    setMode(nextMode);
  }, [mode, setMode]);

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode, isTransitioning, transitionText }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return ctx;
}

export default ModeContext;
