import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgrxUserListViewComponent } from '../../shared/components/ngrx-user-list-view.component';
import { SignalUserStore } from '../state/signals-user.store';

@Component({
  selector: 'app-signals-user-list-page',
  imports: [NgrxUserListViewComponent],
  template: `
    @if (userStore.loading()) {
      <h3>Loading...</h3>
    }
    @if (userStore.error()) {
      <h3>Error: {{ userStore.error() }}</h3>
    } @else {
      <div>
        <app-ngrx-user-list-view [users]="userStore.users()" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsUserListPageComponent implements OnInit {
  readonly userStore = inject(SignalUserStore);

  ngOnInit() {
    this.userStore.retrieveAll();
  }
}
