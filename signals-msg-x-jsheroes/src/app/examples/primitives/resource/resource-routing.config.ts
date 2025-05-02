import { HeaderRoutingCategory } from '@shared/header-routing.types';
import { AppRoutes } from '@shared/app-routes.types';

export const ResourceRoutingConfig: HeaderRoutingCategory = {
  id: 'resources',
  name: 'Resources',
  items: [
    {
      id: 'resources-example-simple',
      name: 'Example Simple',
      route: AppRoutes.ExampleResourceBasicsSimple,
    },
    {
      id: 'resources-example-rx',
      name: 'Example Rx',
      route: AppRoutes.ExampleResourceBasicsRx,
    },
    {
      id: 'resources-example-http',
      name: 'Example Rx',
      route: AppRoutes.ExampleResourceBasicsHttp,
    },
    {
      id: 'resources-example-stream',
      name: 'Example Stream',
      route: AppRoutes.ExampleResourceBasicsStream,
    },
    {
      id: 'resources-usecase-old',
      name: 'Use Case Example Old Way',
      route: AppRoutes.ExampleResourceUseCaseOld,
    },
    {
      id: 'resources-usecase-signals',
      name: 'Use Case Example Signals Way',
      route: AppRoutes.ExampleResourceUseCaseSignals,
    },
    {
      id: 'resources-usecase-resource',
      name: 'Use Case Example Resource Way',
      route: AppRoutes.ExampleResourceUseCaseResource,
    },
  ],
};
