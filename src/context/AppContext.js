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

  const [comments, setComments] = useState(() => load('ct-comments', {}));

  useEffect(() => {
    localStorage.setItem('ct-like-counts', JSON.stringify(likeCounts));
  }, [likeCounts]);

  useEffect(() => {
    localStorage.setItem('ct-user-liked', JSON.stringify(userLiked));
  }, [userLiked]);

  useEffect(() => {
    localStorage.setItem('ct-saved', JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem('ct-comments', JSON.stringify(comments));
  }, [comments]);

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


  const getLikeCount = (id) => {
    return likeCounts[id] || 0;
  };

  const isLiked = (id) => {
    return !!userLiked[id];
  };

  const toggleSave = (id) => {
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addComment = (locationId, author, text) => {
    const comment = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 6),
      author: author.trim(),
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };
    setComments(prev => ({
      ...prev,
      [locationId]: [...(prev[locationId] || []), comment],
    }));
  };

  const deleteComment = (locationId, commentId, authorName) => {
    setComments(prev => {
      const locationComments = prev[locationId] || [];
      const updatedComments = locationComments.filter(c => c.id !== commentId);
      return { ...prev, [locationId]: updatedComments };
    });
  };

  const canDeleteComment = (comment, currentAuthor) => {
    return comment.author === currentAuthor;
  };

  return (
    <AppContext.Provider value={{
      likeCounts,
      userLiked,
      saved,
      comments,
      getLikeCount,
      isLiked,
      toggleLike,
      toggleSave,
      addComment,
      deleteComment,
      canDeleteComment,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);