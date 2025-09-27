import { useState } from 'react';
import Loader from './screens/Loader';
import Desktop from './components/Desktop';

type AppState = 'loading' | 'desktop';

function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setAppState('desktop');
    setIsInitialLoad(false);
  };

  const handleLogout = () => {
    // Give time for any Webamp cleanup before state reset
    setTimeout(() => {
      setCurrentUser(null);
      setAppState('loading');
      // This is not the initial load anymore, so skip loading sequence
    }, 100);
  };

  if (appState === 'loading') {
    return <Loader onLogin={handleLogin} skipLoading={!isInitialLoad} />;
  }

  return <Desktop currentUser={currentUser} onLogout={handleLogout} />;
}

export default App
