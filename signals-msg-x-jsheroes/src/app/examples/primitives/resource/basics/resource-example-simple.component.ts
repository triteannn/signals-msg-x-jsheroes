import {
  ChangeDetectionStrategy,
  Component,
  resource,
  ResourceStatus,
  signal,
} from '@angular/core';
import { mockUserFetch } from '../../../../shared/resource-mock.utils';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-resource-example-simple',
  imports: [MatButton],
  template: `
    <div>
      <h1>Resource Example Simple Usage</h1>
      <div class="flex-row gap-4">
        <button mat-stroked-button (click)="onSetUserId()">Set User Id</button>
        <button mat-stroked-button (click)="onReload()">Reload</button>
      </div>
      <div class="p-4">
        <div>Status: {{ ResourceStatusMap[userResource.status()] }}</div>
        <div>Loading: {{ userResource.isLoading() }}</div>
        <div>Has Value: {{ userResource.hasValue() }}</div>

        @let currentUser = userResource.value();
        @if (currentUser && userResource.hasValue()) {
          <div>
            <h3>Current User: {{ currentUser.name }}</h3>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceExampleSimpleComponent {
  protected readonly ResourceStatusMap = {
    [ResourceStatus.Idle]: 'Idle',
    [ResourceStatus.Error]: 'Error',
    [ResourceStatus.Loading]: 'Loading',
    [ResourceStatus.Reloading]: 'Reloading',
    [ResourceStatus.Resolved]: 'Resolved',
    [ResourceStatus.Local]: 'Local',
  };

  userId = signal<number>(1);

  userResource = resource({
    request: () => ({ id: this.userId() }), // if this returns undefined, the resource will go into idle state
    loader: async ({ request }) => {
      console.log('Loading user data...');
      return mockUserFetch('api/users', request.id.toString(), 3000);
    },
    defaultValue: undefined,
  });

  protected onSetUserId() {
    this.userId.update((x) => (x <= 3 ? x + 1 : 0));
  }

  protected onReload() {
    this.userResource.reload();
  }
}
