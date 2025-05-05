import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<div class="hello-world">
    <img
      src="https://media1.tenor.com/m/mGgWY8RkgYMAAAAd/hello-world.gif"
      alt="Hello World"
    />
  </div> `,
  styles: `
    .hello-world {
      display: flex;
      justify-content: center;
    }
  `,
})
export class HomeComponent {}
