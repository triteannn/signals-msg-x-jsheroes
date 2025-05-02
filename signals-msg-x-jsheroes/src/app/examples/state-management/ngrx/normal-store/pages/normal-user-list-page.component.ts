import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NormalUserFacadeService } from '../state/normal-user-facade.service';
import { NgrxUserListViewComponent } from '../../shared/components/ngrx-user-list-view.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-normal-user-list-page',
  imports: [NgrxUserListViewComponent],
  template: `
    @if (loading()) {
      <h3>Loading...</h3>
    }
    @if (error()) {
      <h3>Error: {{ error() }}</h3>
    } @else {
      <div>
        <app-ngrx-user-list-view [users]="users()" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NormalUserListPageComponent implements OnInit {
  private readonly usersFacade = inject(NormalUserFacadeService);
  protected readonly users = toSignal(
    this.usersFacade.getAllNormalUsersStream(),
    { initialValue: [] }
  );
  protected readonly loading = toSignal(this.usersFacade.getIsLoadingStream());
  protected readonly error = toSignal(this.usersFacade.getErrorStream());

  ngOnInit() {
    this.usersFacade.sendRetrieveALl();
  }
}
