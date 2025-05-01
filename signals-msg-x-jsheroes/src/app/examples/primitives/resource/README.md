# Resource

Provides a way to incorporate async data in your application.
Encapsulates the logic of loading, error handling, and data retrieval.

## Core Resource Interface
```typescript
interface Resource<T> {
  readonly value: Signal<T>;
  readonly status: Signal<ResourceStatus>;
  readonly error: Signal<Error | undefined>;
  readonly isLoading: Signal<boolean>;
  hasValue(): boolean;
}
```

## Types

- Normal
- Rx
- Http
- Stream


## Abort Signal

From angular docs: 
```typescript
const userResource = resource({
  request: () => ({id: userId()}),
  loader: ({request, abortSignal}): Promise<User> => {
    // fetch cancels any outstanding HTTP requests when the given `AbortSignal`
    // indicates that the request has been aborted.
    return fetch(`users/${request.id}`, {signal: abortSignal});
  },
});
```
