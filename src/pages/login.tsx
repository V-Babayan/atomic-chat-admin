import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthed, login } from '~/lib/auth';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Field } from '~/components/ui/label';

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (isAuthed()) {
    return <Navigate to="/models" replace />;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (login(username, password)) {
        navigate('/models', { replace: true });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-neutral-100 py-12">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
      >
        <h1 className="mb-1 text-xl font-semibold">Sign in</h1>
        <p className="mb-6 text-sm text-neutral-500">
          Atomic Chat · Admin panel
        </p>

        <div className="flex flex-col gap-4">
          <Field label="Username">
            <Input
              value={username}
              autoComplete="username"
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
          </Field>
          <Field label="Password">
            <Input
              value={password}
              type="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
          </Field>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </div>
  );
}
