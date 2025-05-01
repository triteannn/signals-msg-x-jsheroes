import { Component, input } from '@angular/core';
import { MockUser } from '@shared/resource-mock.utils';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  template: ` <h2>Users</h2>
    <mat-list role="list">
      @for (user of users(); track $index) {
        <mat-list-item>
          <mat-icon matListItemIcon>person</mat-icon>
          <div matListItemTitle>{{ user.name }}</div>
          <small matListItemLine>{{ 'ID: ' + user.id }}</small>
        </mat-list-item>
      }
    </mat-list>`,
  imports: [MatList, MatListItem, MatIcon],
})
export class UserListComponent {
  users = input.required<MockUser[]>();
}
