import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockUser } from '@shared/resource-mock.utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserClientService {
  private readonly httpClient = inject(HttpClient);

  retrieveAll(): Observable<MockUser[]> {
    return this.httpClient.get<MockUser[]>('/api/users');
  }
}
