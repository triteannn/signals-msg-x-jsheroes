# Effects Basics

Similar to a computed signal in the idea that it runs whenever one or more signal values change.

## Notes
- They run at least once.
- Execute asynchronously, during the change detection process.
- Keep track of their dependencies dynamically (similar to computed signals, **only the signals read in most recent execution**)

## Use Cases

As per Angular Team: 
- Logging data being displayed and when it changes, either for analytics or as a debugging tool.
- Keeping data in sync with window.localStorage.
- Adding custom DOM behavior that can't be expressed with template syntax.
- Performing custom rendering to a canvas, charting library, or other third party UI library.

Other (maybe) valid use cases:
- Fetching data from an API when a signal changes. (use **untracked** as safety net)
- As a bridge between reactive context and non-reactive context (e.g.: updating form when signal changes)

## When not to use

As per Angular Team:
Avoid using effects for propagation of state changes. 
This can result in ExpressionChangedAfterItHasBeenChecked errors, infinite circular updates, or unnecessary change detection cycles.
Instead, use computed signals to model state that depends on other state.


## Cleanup

Angular will take care of cleaning up the effect when the component is destroyed.
Otherwise, you can destroy it manually by using the returned reference of the effect function.
