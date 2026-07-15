import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthed, setPat, verifyPat } from '~/lib/auth';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Field } from '~/components/ui/label';

const OWNER = import.meta.env.VITE_DATA_REPO_OWNER;
const REPO = import.meta.env.VITE_DATA_REPO_NAME;

export function LoginPage() {
  const navigate = useNavigate();
  const [pat, setPatValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (isAuthed()) {
    return <Navigate to="/models" replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const trimmed = pat.trim();
      if (!trimmed) {
        setError('Paste a token');
        return;
      }
      const who = await verifyPat(trimmed);
      if (!who) {
        setError('GitHub rejected this token');
        return;
      }
      setPat(trimmed);
      navigate('/models', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verify failed');
    } finally {
      setBusy(false);
    }
  }

  const settingsUrl =
    OWNER && REPO
      ? `https://github.com/settings/personal-access-tokens/new?target_login=${encodeURIComponent(
          OWNER,
        )}&repositories=${encodeURIComponent(REPO)}`
      : 'https://github.com/settings/personal-access-tokens/new';

  return (
    <div className="flex min-h-full items-center justify-center bg-neutral-100 py-12">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
      >
        <h1 className="mb-1 text-xl font-semibold">Sign in</h1>
        <p className="mb-6 text-sm text-neutral-500">
          Atomic Chat · Admin panel
        </p>

        <div className="flex flex-col gap-4">
          <Field
            label="GitHub Personal Access Token"
            hint={
              <>
                Create a fine-grained token with{' '}
                <strong>Contents · Read and write</strong> on{' '}
                <code>
                  {OWNER ?? '<owner>'}/{REPO ?? '<data-repo>'}
                </code>
                . <a
                  href={settingsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-900 underline"
                >
                  Open GitHub settings
                </a>
                . Token is stored in <code>localStorage</code> and never leaves your browser.
              </>
            }
          >
            <Input
              value={pat}
              type="password"
              autoComplete="off"
              placeholder="github_pat_…"
              onChange={e => setPatValue(e.target.value)}
              autoFocus
            />
          </Field>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <Button type="submit" disabled={busy}>
            {busy ? 'Verifying…' : 'Sign in'}
          </Button>
        </div>
      </form>
    </div>
  );
}
