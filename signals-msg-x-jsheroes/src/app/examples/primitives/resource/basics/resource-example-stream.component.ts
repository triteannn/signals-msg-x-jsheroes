import {
  ChangeDetectionStrategy,
  Component,
  resource,
  ResourceStatus,
} from '@angular/core';
import {
  mockStreamSignal,
  mockUsersFetchStream,
} from '../../../../shared/resource-mock.utils';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-resource-example-stream',
  imports: [MatButton],
  template: `
    <div>
      <h1>Resource Example Stream Usage</h1>
      <div class="flex-row gap-4">
        <button mat-stroked-button (click)="onReload()">Reload</button>
      </div>
      <div class="p-4">
        <div>Status: {{ ResourceStatusMap[userListResource.status()] }}</div>
        <div>Loading: {{ userListResource.isLoading() }}</div>
        <div>Has Value: {{ userListResource.hasValue() }}</div>

        @if (userListResource.hasValue()) {
          @for (user of userListResource.value(); track user.id) {
            <div>
              <h3>User: {{ user.name }}</h3>
            </div>
          }
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceExampleStreamComponent {
  protected readonly ResourceStatusMap = {
    [ResourceStatus.Idle]: 'Idle',
    [ResourceStatus.Error]: 'Error',
    [ResourceStatus.Loading]: 'Loading',
    [ResourceStatus.Reloading]: 'Reloading',
    [ResourceStatus.Resolved]: 'Resolved',
    [ResourceStatus.Local]: 'Local',
  };

  userListResource = resource({
    stream: () => {
      console.log('Loading user data...');
      return mockUsersFetchStream('api/users', 1000);
    },
    defaultValue: [],
  });

  protected onReload() {
    this.userListResource.reload();
    mockStreamSignal.set({ value: [] }); // reset the signal for presentation purposes
  }
}
