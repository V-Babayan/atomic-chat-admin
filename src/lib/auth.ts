const AUTH_KEY = 'atomic-admin.authed';

export function isAuthed(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function login(username: string, password: string): boolean {
  const expectedUser = import.meta.env.VITE_ADMIN_USERNAME;
  const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) {
    throw new Error(
      'VITE_ADMIN_USERNAME / VITE_ADMIN_PASSWORD are not configured. See .env.example.',
    );
  }
  if (username === expectedUser && password === expectedPass) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}
