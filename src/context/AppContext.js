import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [liked, setLiked] = useState(() => load('ct-liked', {}));
  const [saved, setSaved] = useState(() => load('ct-saved', {}));
  const [comments, setComments] = useState(() => load('ct-comments', {}));
  const [myCommentIds, setMyCommentIds] = useState(() => load('ct-my-comments', []));

  useEffect(() => { localStorage.setItem('ct-liked', JSON.stringify(liked)); }, [liked]);
  useEffect(() => { localStorage.setItem('ct-saved', JSON.stringify(saved)); }, [saved]);
  useEffect(() => { localStorage.setItem('ct-comments', JSON.stringify(comments)); }, [comments]);
  useEffect(() => { localStorage.setItem('ct-my-comments', JSON.stringify(myCommentIds)); }, [myCommentIds]);

  const toggleLike = (id) =>
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleSave = (id) =>
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));

  const addComment = (locationId, author, text) => {
    const comment = {
      id: Date.now().toString(),
      author,
      text,
      timestamp: new Date().toISOString(),
    };
    setComments(prev => ({
      ...prev,
      [locationId]: [...(prev[locationId] || []), comment],
    }));
    setMyCommentIds(prev => [...prev, comment.id]);
  };

  const deleteComment = (locationId, commentId) => {
    setComments(prev => ({
      ...prev,
      [locationId]: (prev[locationId] || []).filter(c => c.id !== commentId),
    }));
    setMyCommentIds(prev => prev.filter(id => id !== commentId));
  };

  const isMyComment = (commentId) => myCommentIds.includes(commentId);

  return (
    <AppContext.Provider value={{
      liked, saved, comments,
      toggleLike, toggleSave, addComment, deleteComment, isMyComment,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
