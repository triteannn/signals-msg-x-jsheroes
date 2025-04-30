import { Observable, of } from 'rxjs';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { ResourceStreamItem, signal, Signal } from '@angular/core';

export type MockUser = { id: string; name: string };
export const mockUsers: MockUser[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' },
  { id: '4', name: 'Bob Brown' },
];

export function mockUserFetch(
  url: string,
  id: string,
  delayTime: number = 1000
): Promise<MockUser | undefined> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundUser = mockUsers.find((x) => x.id === id);
      if (foundUser) {
        resolve(foundUser);
      } else {
        reject('User not found');
      }
    }, delayTime);
  });
}

export function mockUserFetchRx(
  url: string,
  id: string,
  delayTime: number = 1000
): Observable<MockUser | undefined> {
  return new Observable((observer) => {
    const timeoutRef = setTimeout(() => {
      const foundUser = mockUsers.find((x) => x.id === id);
      if (foundUser) {
        observer.next(foundUser);
        observer.complete();
      } else {
        observer.error('User not found');
      }
    }, delayTime);
    return () => clearTimeout(timeoutRef);
  });
}

export const mockStreamSignal = signal<ResourceStreamItem<MockUser[]>>({
  value: [],
});
export async function mockUsersFetchStream(
  url: string,
  delayTime: number = 1000
): Promise<Signal<ResourceStreamItem<MockUser[]>>> {
  let index = 0;
  const intervalId = setInterval(() => {
    if (index >= mockUsers.length) {
      clearInterval(intervalId);
      return;
    }
    const current = mockStreamSignal() as { value: MockUser[] };

    const updated = [...current.value, mockUsers[index]];
    mockStreamSignal.set({ value: updated });

    index++;
  }, delayTime);
  return mockStreamSignal.asReadonly();
}

export const mockUsersInterceptor: HttpInterceptorFn = (req, next) => {
  const userIdMatch = req.url.match(/^\/?api\/users\/(\d+)$/);

  if (req.method === 'GET' && userIdMatch) {
    const userId = userIdMatch[1];

    const foundUser = mockUsers.find((x) => x.id === userId);

    if (!foundUser) {
      return of(new HttpResponse({ status: 404, body: 'User not found' }));
    }
    return of(new HttpResponse({ status: 200, body: foundUser }));
  }

  return next(req);
};
