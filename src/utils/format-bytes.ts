const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

export function formatBytes(bytes: number | undefined): string {
  if (bytes == null || Number.isNaN(bytes)) return '—';
  if (bytes === 0) return '0 B';
  const rawIndex = Math.floor(Math.log(bytes) / Math.log(1024));
  const i = Math.min(UNITS.length - 1, Math.max(0, rawIndex));
  const unit = UNITS[i] ?? 'B';
  const value = bytes / 1024 ** i;
  const decimals = value >= 100 || i === 0 ? 0 : value >= 10 ? 1 : 2;
  return `${value.toFixed(decimals)} ${unit}`;
}
