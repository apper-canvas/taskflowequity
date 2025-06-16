import Dashboard from '@/components/pages/Dashboard';

export const routes = {
  dashboard: {
    id: 'dashboard',
    label: 'Tasks',
    path: '/dashboard',
    icon: 'CheckSquare',
    component: Dashboard
  }
};

export const routeArray = Object.values(routes);
export default routes;