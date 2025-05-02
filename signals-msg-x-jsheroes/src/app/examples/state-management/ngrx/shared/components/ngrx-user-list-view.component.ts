import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MockUser } from '@shared/resource-mock.utils';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ngrx-user-list-view',
  imports: [MatIcon, MatList, MatListItem],
  template: `
    <mat-list role="list">
      @for (user of users(); track user.id) {
        <mat-list-item [id]="user.id">
          <mat-icon matListItemIcon>person</mat-icon>
          <div matListItemTitle>{{ user.name }}</div>
          <small matListItemLine>{{ 'ID: ' + user.id }}</small>
        </mat-list-item>
      }
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxUserListViewComponent {
  users = input.required<MockUser[]>();
}
