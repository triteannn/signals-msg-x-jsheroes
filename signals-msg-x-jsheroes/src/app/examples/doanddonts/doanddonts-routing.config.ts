import { HeaderRoutingCategory } from '@shared/header-routing.types';
import { AppRoutes } from '@shared/app-routes.types';

export const DonAndDontsRoutingConfig: HeaderRoutingCategory = {
  id: 'doanddonts',
  name: 'DOs and DONTs',
  items: [
    {
      id: 'doanddonts-conditional-issue',
      name: 'Conditional Issue',
      route: AppRoutes.ExampleDoAndDontSignalsConditionalIssue,
    },
    {
      id: 'doanddonts-effect-loop-issue',
      name: 'Effect Loop Issue',
      route: AppRoutes.ExampleDoAndDontEffectLoopIssue,
    },
  ],
};
