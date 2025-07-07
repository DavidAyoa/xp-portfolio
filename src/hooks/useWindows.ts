import { useState, useEffect } from 'react';

const WINDOWS_STORAGE_KEY = 'windows';

export const useWindows = () => {
  // Load initial state from localStorage or default to empty array
  const [openWindowIds, setOpenWindowIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(WINDOWS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage whenever openWindowIds changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(WINDOWS_STORAGE_KEY, JSON.stringify(openWindowIds));
    }
  }, [openWindowIds]);

  // Add a window ID if it doesn't exist
  const addWindow = (windowId: string) => {
    setOpenWindowIds(prevIds => 
      prevIds.includes(windowId) ? prevIds : [...prevIds, windowId]
    );
  };

  // Remove a window ID
  const removeWindow = (windowId: string) => {
    setOpenWindowIds(prevIds => prevIds.filter(id => id !== windowId));
  };

  // Load state from localStorage (useful for syncing across tabs)
  const loadState = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(WINDOWS_STORAGE_KEY);
      if (saved) {
        setOpenWindowIds(JSON.parse(saved));
      }
    }
  };

  return {
    openWindowIds,
    addWindow,
    removeWindow,
    loadState
  };
};

export default useWindows;
