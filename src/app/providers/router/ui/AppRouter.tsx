import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { routeConfig } from '../config/routeConfig';

export const AppRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {routeConfig.map(({ element, path }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  </Suspense>
);
