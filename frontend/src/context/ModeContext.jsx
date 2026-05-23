import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ModeContext = createContext(null);

const TITLES = {
  portfolio: 'Portfolio | Glenn Joshua Corpus',
  personal: 'Personal | Glenn Joshua Corpus',
};

const STORAGE_KEY = 'portfolio-mode';

export function ModeProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setModeState] = useState(() => {
    // Initial load: parse the route or default to portfolio
    const path = window.location.pathname;
    if (path.startsWith('/personal')) return 'personal';
    return 'portfolio';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('');

  // Keep state synced if URL changes via back/forward buttons
  useEffect(() => {
    const currentMode = location.pathname.startsWith('/personal') ? 'personal' : 'portfolio';
    if (currentMode !== mode && !isTransitioning) {
      setModeState(currentMode);
    }
  }, [location.pathname, isTransitioning, mode]);

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
    if ((newMode !== 'portfolio' && newMode !== 'personal') || newMode === mode || isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setTransitionText(
      newMode === 'personal' ? 'Entering Personal Space...' : 'Entering Portfolio Space...'
    );

    // Wait for all 6 panels to fully cover the screen (approx 600ms)
    setTimeout(() => {
      setModeState(newMode);
      navigate(`/${newMode}`);
    }, 600);

    // Begin exit sequence shortly after content has swapped (650ms)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 650);
  }, [mode, isTransitioning, navigate]);

  const toggleMode = useCallback(() => {
    const nextMode = mode === 'portfolio' ? 'personal' : 'portfolio';
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
