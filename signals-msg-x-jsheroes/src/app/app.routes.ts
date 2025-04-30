import { Routes } from '@angular/router';
import { AppRoutes } from './shared/app-routes.types';
import { EffectBasicExampleFirstComponent } from './examples/primitives/effects/basics/effect-basic-example-first.component';
import { EffectBasicExampleSecondComponent } from './examples/primitives/effects/basics/effect-basic-example-second.component';
import { EffectBasicExampleThirdComponent } from './examples/primitives/effects/basics/effect-basic-example-third.component';
import { SignalsConditionalIssueComponent } from './examples/doanddonts/conditional-issue/signals-conditional-issue.component';
import { EffectBadExampleComponent } from './examples/primitives/effects/usecase/effect-bad-example.component';
import { EffectGoodExampleComponent } from './examples/primitives/effects/usecase/effect-good-example.component';
import { EffectCleanupExampleComponent } from './examples/primitives/effects/cleanup/effect-cleanup-example.component';
import { LinkedSignalExampleEntryComponent } from './examples/primitives/linked-signal/linked-signal-example-entry.component';

export const routes: Routes = [
  // DO AND DONT
  {
    path: AppRoutes.ExampleDoAndDontSignalsConditionalIssue,
    component: SignalsConditionalIssueComponent,
  },
  // EFFECTS
  {
    path: AppRoutes.ExampleEffectBasicsFirst,
    component: EffectBasicExampleFirstComponent,
  },
  {
    path: AppRoutes.ExampleEffectBasicsSecond,
    component: EffectBasicExampleSecondComponent,
  },
  {
    path: AppRoutes.ExampleEffectBasicsThird,
    component: EffectBasicExampleThirdComponent,
  },
  {
    path: AppRoutes.ExampleEffectUseCaseBad,
    component: EffectBadExampleComponent,
  },
  {
    path: AppRoutes.ExampleEffectUseCaseGood,
    component: EffectGoodExampleComponent,
  },
  {
    path: AppRoutes.ExampleEffectCleanup,
    component: EffectCleanupExampleComponent,
  },
  // LINKED SIGNAL
  {
    path: AppRoutes.ExampleLinkedSignal,
    component: LinkedSignalExampleEntryComponent,
  },
];
