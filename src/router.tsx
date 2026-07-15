import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthGate } from '~/components/auth-gate';
import { LoginPage } from '~/pages/login';
import { ModelsListPage } from '~/pages/models-list';
import { ModelFormPage } from '~/pages/model-form';

export const router = createBrowserRouter(
  [
    { path: '/', element: <Navigate to="/models" replace /> },
    { path: '/login', element: <LoginPage /> },
    {
      element: <AuthGate />,
      children: [
        { path: '/models', element: <ModelsListPage /> },
        { path: '/models/new', element: <ModelFormPage mode="create" /> },
        { path: '/models/:id/edit', element: <ModelFormPage mode="edit" /> },
      ],
    },
    { path: '*', element: <Navigate to="/models" replace /> },
  ],
  { basename: import.meta.env.BASE_URL },
);
