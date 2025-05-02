import {
  ChangeDetectionStrategy,
  Component,
  ResourceStatus,
  signal,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import { z } from 'zod';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-resource-example-http',
  imports: [MatButton],
  template: `
    <div>
      <h1>Resource Example Http Usage</h1>
      <div class="flex-row gap-4">
        <button mat-stroked-button (click)="onSetUserId()">Set User Id</button>
        <button mat-stroked-button (click)="onReload()">Reload</button>
      </div>
      <div class="p-4">
        <div>Status: {{ ResourceStatusMap[userResourceHttp.status()] }}</div>
        <div>Loading: {{ userResourceHttp.isLoading() }}</div>
        <div>Has Value: {{ userResourceHttp.hasValue() }}</div>
        <div>Error: {{ userResourceHttp.error() }}</div>

        @let currentUser = userResourceHttp.value();
        @if (currentUser && userResourceHttp.hasValue()) {
          <div>
            <h3>Current User: {{ currentUser.name }}</h3>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceExampleHttpComponent {
  protected readonly ResourceStatusMap = {
    [ResourceStatus.Idle]: 'Idle',
    [ResourceStatus.Error]: 'Error',
    [ResourceStatus.Loading]: 'Loading',
    [ResourceStatus.Reloading]: 'Reloading',
    [ResourceStatus.Resolved]: 'Resolved',
    [ResourceStatus.Local]: 'Local',
  };
  UserSchema = z.object({
    id: z.string(),
    name: z.string(),
  });

  userId = signal<number>(1);
  userResourceHttp = httpResource(
    () => ({
      url: `api/users/${this.userId()}`, // the endpoint does not exist for us
      method: 'Get',
      headers: { Authorization: 'Bearer token' },
    }),
    {
      defaultValue: undefined,
      parse: this.UserSchema.parse, // support for schema validation of the returned data
    }
  );

  protected onSetUserId() {
    this.userId.update((x) => (x <= 3 ? x + 1 : 0));
  }

  protected onReload() {
    this.userResourceHttp.reload();
  }
}
