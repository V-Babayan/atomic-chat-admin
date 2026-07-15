const PAT_KEY = 'atomic-admin.pat';

export function getPat(): string | null {
  return localStorage.getItem(PAT_KEY);
}

export function setPat(pat: string) {
  localStorage.setItem(PAT_KEY, pat.trim());
}

export function clearPat() {
  localStorage.removeItem(PAT_KEY);
}

export function isAuthed(): boolean {
  return getPat() !== null;
}

export async function verifyPat(pat: string): Promise<{
  login: string;
} | null> {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${pat}`,
    },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { login: string };
  return { login: json.login };
}
