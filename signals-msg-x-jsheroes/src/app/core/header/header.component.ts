import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  template: ` <nav>
    <span>It's a Sign(al)!</span>
    <section class="links-section">
      <a mat-button routerLinkActive="nav-item-active">Primitives</a>
      <a mat-button [matMenuTriggerFor]="stateManagement">State management</a>
      <a mat-button routerLinkActive="nav-item-active">DOs and DONTs</a>
      <a mat-button routerLinkActive="nav-item-active">Effects</a>
      <a mat-button routerLinkActive="nav-item-active">Linked Signals</a>
      <a mat-button routerLinkActive="nav-item-active">Resources</a>
    </section>

    <mat-menu #stateManagement="matMenu">
      <button mat-menu-item routerLink="examples/state-management/manual">
        Manual
      </button>
      <button mat-menu-item>ngrx</button>
    </mat-menu>
  </nav>`,
  styles: `
    nav {
      display: flex;
      align-items: center;
      background: var(--mat-sys-primary-container);
      padding: 1rem;

      .links-section {
        flex: 1;
        display: flex;
        gap: 1rem;
        justify-content: center;
      }

      a,
      span {
        color: var(--mat-sys-primary);
      }

      a {
        font-size: 1rem;
      }

      span {
        font-weight: bold;
        font-size: 1.125rem;
      }
    }
  `,
  imports: [MatAnchor, RouterLink, RouterLinkActive, MatMenuModule],
})
export class HeaderComponent {}
