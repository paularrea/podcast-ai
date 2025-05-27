import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL || 'http://localhost:5000';

export async function createPodcast(
  title: string,
  minutes: string,
  narrativeType: string,
  description: string,
  updateStep: (index: number, done: boolean) => void
): Promise<string> {
  try {
    updateStep(0, true); 
    updateStep(1, true); 
    updateStep(2, true); 
    updateStep(3, false);

    const res = await fetch(`${API_URL}/api/podcasts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({
        title,
        minutes,
        narrativeType,
        description,
      }),
    });

    const data = await res.json();

    updateStep(3, true); // Podcast created
    updateStep(4, true); // File uploaded
    updateStep(5, true); // DB stored

    return data.fileUri;
  } catch (err) {
    console.error('❌ Error creating podcast:', err);
    throw err;
  }
}

const getToken = async (): Promise<string> => {
  const { getAuth } = await import('firebase/auth');
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('No user logged in');
  return user.getIdToken();
};
