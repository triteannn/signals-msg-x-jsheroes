import { HeaderRoutingCategory } from '@shared/header-routing.types';
import { AppRoutes } from '@shared/app-routes.types';

export const EffectsRoutingCategory: HeaderRoutingCategory = {
  id: 'effects',
  name: 'Effects',
  items: [
    {
      id: 'effects-basics-01',
      name: 'Basics 01',
      route: AppRoutes.ExampleEffectBasicsFirst,
    },
    {
      id: 'effects-basics-02',
      name: 'Basics 02',
      route: AppRoutes.ExampleEffectBasicsSecond,
    },
    {
      id: 'effects-basics-03',
      name: 'Basics 03',
      route: AppRoutes.ExampleEffectBasicsThird,
    },
    {
      id: 'effects-usecase-bad',
      name: 'Use Case Bad',
      route: AppRoutes.ExampleEffectUseCaseBad,
    },
    {
      id: 'effects-usecase-good',
      name: 'Use Case Good',
      route: AppRoutes.ExampleEffectUseCaseGood,
    },
    {
      id: 'effects-cleanup',
      name: 'Cleanup',
      route: AppRoutes.ExampleEffectCleanup,
    },
  ],
};
