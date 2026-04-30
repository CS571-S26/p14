import React, { createContext, useContext, useState, useEffect } from 'react';
import locations from '../data/locations';

const AppContext = createContext();

function load(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [likeCounts, setLikeCounts] = useState(() => {
    const saved = load('ct-like-counts', {});
    const init = {};
    locations.forEach(loc => {
      init[loc.id] = saved[loc.id] !== undefined ? saved[loc.id] : 0;
    });
    return init;
  });

  const [userLiked, setUserLiked] = useState(() => load('ct-user-liked', {}));

  const [saved, setSaved] = useState(() => load('ct-saved', {}));

  useEffect(() => {
    localStorage.setItem('ct-like-counts', JSON.stringify(likeCounts));
  }, [likeCounts]);

  useEffect(() => {
    localStorage.setItem('ct-user-liked', JSON.stringify(userLiked));
  }, [userLiked]);

  useEffect(() => {
    localStorage.setItem('ct-saved', JSON.stringify(saved));
  }, [saved]);

  const toggleLike = (id) => {
    const hasLiked = !!userLiked[id];
    if (hasLiked) {
      setLikeCounts(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
      setUserLiked(prev => ({ ...prev, [id]: false }));
    } else {
      setLikeCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      setUserLiked(prev => ({ ...prev, [id]: true }));
    }
  };

  const getLikeCount = (id) => likeCounts[id] || 0;
  const isLiked = (id) => !!userLiked[id];
  const toggleSave = (id) => setSaved(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <AppContext.Provider value={{
      saved,
      getLikeCount,
      isLiked,
      toggleLike,
      toggleSave,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
