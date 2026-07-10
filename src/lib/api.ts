const TOKEN_KEY = 'treasureGame.token';
const USERNAME_KEY = 'treasureGame.username';

export interface AuthSession {
  token: string;
  username: string;
}

export interface ScoreEntry {
  score: number;
  result: 'win' | 'loss' | 'tie';
  createdAt: string;
}

export interface ScoreSummary {
  best: number | null;
  history: ScoreEntry[];
}

export function getStoredSession(): AuthSession | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const username = localStorage.getItem(USERNAME_KEY);
  return token && username ? { token, username } : null;
}

export function storeSession(session: AuthSession) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USERNAME_KEY, session.username);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

async function parseResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data as T;
}

export async function signUp(username: string, password: string): Promise<AuthSession> {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return parseResponse<AuthSession>(res);
}

export async function signIn(username: string, password: string): Promise<AuthSession> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return parseResponse<AuthSession>(res);
}

export async function signOut(token: string): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  }).catch(() => {});
}

export async function fetchMyScores(token: string): Promise<ScoreSummary> {
  const res = await fetch('/api/scores/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return parseResponse<ScoreSummary>(res);
}

export async function submitScore(token: string, score: number): Promise<ScoreSummary> {
  const res = await fetch('/api/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ score }),
  });
  return parseResponse<ScoreSummary>(res);
}
