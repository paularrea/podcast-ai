import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

console.log('[📡 API_URL]', API_URL);

const waitForAuth = (): Promise<User | null> =>
  new Promise((resolve) => {
    const unsub = onAuthStateChanged(getAuth(), (user) => {
      unsub();
      resolve(user);
    });
  });

const getIdToken = async (): Promise<string | null> => {
  try {
    const auth = getAuth();
    const user: User | null = auth.currentUser ?? (await waitForAuth());

    if (!user) {
      console.warn('[Auth] No user is signed in');
      return null;
    }

    return user.getIdToken();
  } catch (err) {
    console.error('[Auth] Failed to get ID token:', err);
    return null;
  }
};

export const useApi = () => {
  const getHeaders = async () => {
    const token = await getIdToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  };

  const request = async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: object
  ) => {
    const url = `${API_URL}${path}`;
    const headers = await getHeaders();

    // 🛑 Prevent unauthorized requests
    if (!headers.Authorization) {
      console.warn(`[API] Skipping ${method} ${path}: No valid auth token`);
      return null;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      console.log(`📡 ${method} ${url}`, body || '');
      const res = await fetch(url, config);

      const contentType = res.headers.get('Content-Type');
      const isJson = contentType?.includes('application/json');
      const data = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        console.warn(`❌ API ${method} ${url} failed`, { body, headers, data });
        throw new Error(typeof data === 'string' ? data : data?.message || 'API error');
      }

      return data;
    } catch (err: any) {
      console.error(`❌ API ${method} ${url} failed:`, err.message);
      throw err;
    }
  };

  return {
    get: (path: string) => request('GET', path),
    post: (path: string, body: object) => request('POST', path, body),
    put: (path: string, body: object) => request('PUT', path, body),
    del: (path: string) => request('DELETE', path),
  };
};
