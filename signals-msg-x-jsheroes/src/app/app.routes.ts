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
import { ResourceExampleSimpleComponent } from './examples/primitives/resource/basics/resource-example-simple.component';
import { ResourceExampleRxComponent } from './examples/primitives/resource/basics/resource-example-rx.component';
import { ResourceExampleHttpComponent } from './examples/primitives/resource/basics/resource-example-http.component';
import { ResourceExampleStreamComponent } from './examples/primitives/resource/basics/resource-example-stream.component';
import { ResourceExampleUseCaseOldComponent } from './examples/primitives/resource/usecase/resource-example-usecase-old.component';
import { ResourceExampleUseCaseSignalsComponent } from './examples/primitives/resource/usecase/resource-example-usecase-signals.component';
import { ResourceExampleUseCaseResourceComponent } from './examples/primitives/resource/usecase/resource-example-usecase-resource.component';
import { EffectLoopComponent } from './examples/doanddonts/effect-loop/effect-loop.component';
import { UserManagementComponent } from './examples/state-management/manual/containers/user-management.component';
import { NormalUserListPageComponent } from './examples/state-management/ngrx/normal-store/pages/normal-user-list-page.component';
import { SignalsUserListPageComponent } from './examples/state-management/ngrx/signals-store/pages/signals-user-list-page.component';

export const routes: Routes = [
  // MANUAL SIGNAL STATE MANAGEMENT
  {
    path: AppRoutes.ExampleManualSignalStateManagement,
    component: UserManagementComponent,
  },
  {
    path: AppRoutes.ExampleNgrxNormalStateManagement,
    component: NormalUserListPageComponent,
  },
  {
    path: AppRoutes.ExampleNgrxSignalStateManagement,
    component: SignalsUserListPageComponent,
  },
  // DO AND DONT
  {
    path: AppRoutes.ExampleDoAndDontSignalsConditionalIssue,
    component: SignalsConditionalIssueComponent,
  },
  {
    path: AppRoutes.ExampleDoAndDontEffectLoopIssue,
    component: EffectLoopComponent,
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
  // RESOURCES
  {
    path: AppRoutes.ExampleResourceBasicsSimple,
    component: ResourceExampleSimpleComponent,
  },
  {
    path: AppRoutes.ExampleResourceBasicsRx,
    component: ResourceExampleRxComponent,
  },
  {
    path: AppRoutes.ExampleResourceBasicsHttp,
    component: ResourceExampleHttpComponent,
  },
  {
    path: AppRoutes.ExampleResourceBasicsStream,
    component: ResourceExampleStreamComponent,
  },
  {
    path: AppRoutes.ExampleResourceUseCaseOld,
    component: ResourceExampleUseCaseOldComponent,
  },
  {
    path: AppRoutes.ExampleResourceUseCaseSignals,
    component: ResourceExampleUseCaseSignalsComponent,
  },
  {
    path: AppRoutes.ExampleResourceUseCaseResource,
    component: ResourceExampleUseCaseResourceComponent,
  },
];
