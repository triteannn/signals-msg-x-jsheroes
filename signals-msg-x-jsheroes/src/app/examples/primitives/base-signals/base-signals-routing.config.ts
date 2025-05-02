import { HeaderRoutingCategory } from '@shared/header-routing.types';
import { AppRoutes } from '@shared/app-routes.types';

export const BaseSignalsRoutingCategory: HeaderRoutingCategory = {
  id: 'base-signals',
  name: 'Base Signals',
  items: [
    {
      id: 'base-signals-01',
      name: 'Readonly, Writable and computed Signals',
      route: AppRoutes.ExampleBaseSignalsReadonlyWritableComputed,
    },
    {
      id: 'base-signals-02',
      name: 'Input & Model Signals',
      route: AppRoutes.ExampleBaseSignalsInputModel,
    },
    {
      id: 'base-signals-03',
      name: 'Query Signals',
      route: AppRoutes.ExampleBaseSignalsQueries,
    },
  ],
};
