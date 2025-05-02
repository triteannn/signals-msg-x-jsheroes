import {
  ChangeDetectionStrategy,
  Component,
  ResourceStatus,
  signal,
} from '@angular/core';
import { mockUserFetchRx } from '../../../../shared/resource-mock.utils';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-resource-example-rx',
  imports: [MatButton],
  template: `
    <div>
      <h1>Resource Example Rx Usage</h1>
      <div class="flex-row gap-4">
        <button mat-stroked-button (click)="onSetUserId()">Set User Id</button>
        <button mat-stroked-button (click)="onReload()">Reload</button>
      </div>
      <div class="p-4">
        <div>Status: {{ ResourceStatusMap[userResourceRx.status()] }}</div>
        <div>Loading: {{ userResourceRx.isLoading() }}</div>
        <div>Has Value: {{ userResourceRx.hasValue() }}</div>

        @let currentUser = userResourceRx.value();
        @if (currentUser && userResourceRx.hasValue()) {
          <div>
            <h3>Current User: {{ currentUser.name }}</h3>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceExampleRxComponent {
  protected readonly ResourceStatusMap = {
    [ResourceStatus.Idle]: 'Idle',
    [ResourceStatus.Error]: 'Error',
    [ResourceStatus.Loading]: 'Loading',
    [ResourceStatus.Reloading]: 'Reloading',
    [ResourceStatus.Resolved]: 'Resolved',
    [ResourceStatus.Local]: 'Local',
  };

  userId = signal<number>(1);

  userResourceRx = rxResource({
    request: () => ({ id: this.userId() }),
    loader: ({ request }) => {
      console.log('Loading user data with Rx...');
      return mockUserFetchRx('api/users', request.id.toString(), 3000);
    },
    defaultValue: undefined,
  });

  protected onSetUserId() {
    this.userId.update((x) => (x <= 3 ? x + 1 : 0));
  }

  protected onReload() {
    this.userResourceRx.reload();
  }
}
