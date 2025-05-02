import { HeaderRoutingCategory } from '@shared/header-routing.types';
import { AppRoutes } from '@shared/app-routes.types';

export const StateManagementRoutingConfig: HeaderRoutingCategory = {
  id: 'state-management',
  name: 'State Management',
  items: [
    {
      id: 'state-management-manual',
      name: 'Manual',
      route: AppRoutes.ExampleManualSignalStateManagement,
    },
    {
      id: 'state-management-ngrx-normal',
      name: 'NGRX Normal Store',
      route: AppRoutes.ExampleNgrxNormalStateManagement,
    },
  ],
};
