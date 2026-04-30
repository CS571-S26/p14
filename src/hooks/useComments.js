import { useState, useEffect, useCallback } from 'react';
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, serverTimestamp, query, orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

const TOKENS_KEY = 'ct-deletion-tokens';

function loadTokens() {
  try { return JSON.parse(localStorage.getItem(TOKENS_KEY) || '{}'); }
  catch { return {}; }
}

function saveToken(commentId) {
  const tokens = loadTokens();
  tokens[commentId] = true;
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

function removeToken(commentId) {
  const tokens = loadTokens();
  delete tokens[commentId];
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

export function useComments(locationId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationId) return;
    setLoading(true);

    const q = query(
      collection(db, 'comments', String(locationId), 'entries'),
      orderBy('timestamp', 'desc')
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const tokens = loadTokens();
        setComments(snap.docs.map(d => ({
          id: d.id,
          ...d.data(),
          isOwner: !!tokens[d.id],
        })));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Comments snapshot error:', err);
        setError('Could not load comments.');
        setLoading(false);
      }
    );

    return unsub;
  }, [locationId]);

  const addComment = useCallback(async (username, text) => {
    const ref = await addDoc(
      collection(db, 'comments', String(locationId), 'entries'),
      { username, text: text.trim(), timestamp: serverTimestamp() }
    );
    saveToken(ref.id);
  }, [locationId]);

  const deleteComment = useCallback(async (commentId) => {
    if (!loadTokens()[commentId]) return;
    await deleteDoc(doc(db, 'comments', String(locationId), 'entries', commentId));
    removeToken(commentId);
  }, [locationId]);

  return { comments, loading, error, addComment, deleteComment };
}
