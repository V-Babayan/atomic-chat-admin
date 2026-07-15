import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { modelsClient } from '~/api';
import type { MobileModelDto } from '~/schemas/model';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { formatBytes } from '~/utils/format-bytes';

const DEFAULT_TONE = 'bg-neutral-200 text-neutral-800';
const TONE_CLASS: Record<string, string> = {
  purple: 'bg-purple-100 text-purple-800',
  green: 'bg-green-100 text-green-800',
  orange: 'bg-orange-100 text-orange-800',
  gray: DEFAULT_TONE,
  blue: 'bg-blue-100 text-blue-800',
};

export function ModelsListPage() {
  const [models, setModels] = useState<MobileModelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    modelsClient
      .list()
      .then(setModels)
      .catch(err =>
        setError(err instanceof Error ? err.message : 'Failed to load'),
      )
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return models;
    return models.filter(
      m =>
        m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q),
    );
  }, [models, query]);

  async function onDelete(id: string) {
    if (!confirm(`Delete "${id}"?`)) return;
    try {
      await modelsClient.remove(id);
      setModels(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Mobile models</h1>
        <Link to="/models/new">
          <Button>+ New model</Button>
        </Link>
      </div>

      <Input
        placeholder="Search by name or id"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="max-w-md"
      />

      {loading && <p className="text-sm text-neutral-500">Loading…</p>}
      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Engine</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Platforms</th>
                <th className="px-4 py-3 font-medium">Badges</th>
                <th className="px-4 py-3 font-medium">Onboarding</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr
                  key={m.id}
                  className="border-t border-neutral-100 hover:bg-neutral-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-neutral-900">{m.name}</div>
                    <div className="text-xs text-neutral-500">{m.id}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{m.engine}</td>
                  <td className="px-4 py-3 text-neutral-700">
                    {formatBytes(m.size)}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    {m.platforms.join(', ')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {m.badges.map((b, i) => (
                        <span
                          key={`${b.label}-${i}`}
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            TONE_CLASS[b.tone ?? 'gray'] ?? DEFAULT_TONE
                          }`}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    {m.isOnboarding ? '✓' : ''}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/models/${encodeURIComponent(m.id)}/edit`}>
                        <Button variant="secondary">Edit</Button>
                      </Link>
                      <Button variant="danger" onClick={() => onDelete(m.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-neutral-500"
                  >
                    No models
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
