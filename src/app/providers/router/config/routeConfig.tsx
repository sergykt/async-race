import { Navigate, type RouteProps } from 'react-router-dom';
import { GaragePage } from '@/pages/GaragePage';
import { WinnersPage } from '@/pages/WinnersPage';
import { AppRoutes } from '@/shared/const/router';

export const routeConfig: RouteProps[] = [
  {
    path: AppRoutes.GARAGE,
    element: <GaragePage />,
  },
  {
    path: AppRoutes.WINNERS,
    element: <WinnersPage />,
  },
  {
    path: AppRoutes.NOT_FOUND,
    element: <Navigate to={AppRoutes.GARAGE} />,
  },
];
