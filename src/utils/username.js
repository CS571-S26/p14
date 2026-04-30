import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ADJECTIVES = [
  'happy', 'fluffy', 'bouncy', 'silly', 'clever', 'brave', 'calm', 'dizzy',
  'fancy', 'gentle', 'jolly', 'lucky', 'mighty', 'noble', 'peppy', 'radiant',
  'speedy', 'tiny', 'vivid', 'witty', 'zany', 'bold', 'cozy', 'daring',
  'eager', 'fresh', 'gleeful', 'humble', 'jazzy', 'kind',
];

const ANIMALS = [
  'panda', 'koala', 'penguin', 'otter', 'fox', 'bunny', 'hedgehog', 'sloth',
  'capybara', 'axolotl', 'gecko', 'lemur', 'meerkat', 'parrot', 'quokka',
  'raccoon', 'tiger', 'wolf', 'zebra', 'alpaca', 'beaver', 'crane', 'dolphin',
  'elephant', 'flamingo', 'giraffe', 'hamster', 'jaguar', 'kangaroo', 'llama',
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function getOrCreateUsername() {
  const stored = localStorage.getItem('ct-username');
  if (stored) return stored;

  try {
    for (let attempt = 0; attempt < 25; attempt++) {
      const username = pick(ADJECTIVES) + pick(ANIMALS);
      const ref = doc(db, 'usernames', username);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, { createdAt: new Date().toISOString() });
        localStorage.setItem('ct-username', username);
        return username;
      }
    }
  } catch {
    // Firestore unavailable — fall back to local-only (no global uniqueness)
  }

  // Fallback: skip Firestore uniqueness check
  const fallback = pick(ADJECTIVES) + pick(ANIMALS);
  localStorage.setItem('ct-username', fallback);
  return fallback;
}
