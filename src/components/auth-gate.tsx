import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { isAuthed, logout } from '~/lib/auth';
import { Button } from '~/components/ui/button';

export function AuthGate() {
  const location = useLocation();
  if (!isAuthed()) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/models" className="text-lg font-semibold text-neutral-900">
            Atomic Chat · Admin
          </Link>
          <Button
            variant="ghost"
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
          >
            Sign out
          </Button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
