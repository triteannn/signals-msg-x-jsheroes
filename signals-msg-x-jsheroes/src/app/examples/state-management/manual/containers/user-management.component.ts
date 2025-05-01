import { Component, inject, Signal } from '@angular/core';
import { UserStateService } from '../services/user-state.service';
import { MockUser } from '@shared/resource-mock.utils';
import { UserListComponent } from '../components/user-list.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-management',
  template: `<div class="container">
    @if (isLoadingUsers()) {
      <mat-spinner diameter="36"></mat-spinner>
    } @else if (error()) {
      <h2 class="error-message">
        An error has occurred during user fetching: {{ error() }}
      </h2>
    } @else {
      <app-user-list [users]="users()" />
    }
  </div> `,
  styles: `
    .container {
      display: flex;
      justify-content: center;
    }
    .error-message {
      color: crimson;
    }
  `,
  imports: [UserListComponent, MatProgressSpinner],
  providers: [UserStateService],
})
export class UserManagementComponent {
  // state slices
  users: Signal<MockUser[]>;
  isLoadingUsers: Signal<boolean>;
  error: Signal<unknown>;

  // DI
  private readonly _userStateService = inject(UserStateService);

  constructor() {
    this.users = this._userStateService.users;
    this.isLoadingUsers = this._userStateService.isLoadingUsers;
    this.error = this._userStateService.error;

    // trigger actions
    this._userStateService.fetchUsers();
  }
}
