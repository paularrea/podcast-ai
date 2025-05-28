import { auth } from '../config/firebase';

export const getIdToken = async (): Promise<string | null> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('[Auth] No user logged in (useIdToken)');
      return null;
    }
    return await user.getIdToken();
  } catch (err) {
    console.error('[Auth] getIdToken() failed in useIdToken.ts:', err);
    return null;
  }
};
