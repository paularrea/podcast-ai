import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL || 'http://localhost:5000';

const waitForAuth = (): Promise<User | null> =>
  new Promise((resolve) => {
    const unsub = onAuthStateChanged(getAuth(), (user) => {
      unsub();
      resolve(user);
    });
  });

const getIdToken = async (): Promise<string | null> => {
  const auth = getAuth();
  const user: User | null = auth.currentUser ?? (await waitForAuth());

  if (!user) return null;

  return user.getIdToken();
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

      console.log(`✅ ${res.status} ${method} ${url}`, data);

      if (!res.ok) {
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
