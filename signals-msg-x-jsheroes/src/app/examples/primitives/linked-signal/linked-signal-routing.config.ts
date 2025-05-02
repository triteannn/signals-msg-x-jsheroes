import { HeaderRoutingCategory } from '@shared/header-routing.types';
import { AppRoutes } from '@shared/app-routes.types';

export const LinkedSignalRoutingConfig: HeaderRoutingCategory = {
  id: 'linked-signals',
  name: 'Linked Signals',
  items: [
    {
      id: 'linked-signals-entry',
      name: 'Main Example',
      route: AppRoutes.ExampleLinkedSignal,
    },
  ],
};
