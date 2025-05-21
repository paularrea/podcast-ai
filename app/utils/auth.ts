import { auth } from '../config/firebase';

export const getIdToken = async (): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user is logged in');
  return await user.getIdToken();
};
