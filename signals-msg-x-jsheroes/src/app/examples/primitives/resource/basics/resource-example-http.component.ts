import {
  ChangeDetectionStrategy,
  Component,
  ResourceStatus,
  signal,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import { z } from 'zod';

@Component({
  selector: 'app-resource-example-http',
  imports: [],
  template: `
    <div>
      <h1>Resource Example Http Usage</h1>
      <button (click)="onSetUserId()">Set User Id</button>
      <button (click)="onReload()">Reload</button>
      <div>
        <div>Status: {{ ResourceStatusMap[userResourceHttp.status()] }}</div>
        <div>Loading: {{ userResourceHttp.isLoading() }}</div>
        <div>Has Value: {{ userResourceHttp.hasValue() }}</div>
        <div>Error: {{ userResourceHttp.error() }}</div>

        @let currentUser = userResourceHttp.value();
        @if (currentUser && userResourceHttp.hasValue()) {
          <div>
            <h2>Current User: {{ currentUser.name }}</h2>
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
