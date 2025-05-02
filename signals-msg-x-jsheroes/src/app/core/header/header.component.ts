import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderRoutingCategory } from '@shared/header-routing.types';
import { StateManagementRoutingConfig } from '../../examples/state-management/state-management-routing.config';
import { DonAndDontsRoutingConfig } from '../../examples/doanddonts/doanddonts-routing.config';
import { EffectsRoutingCategory } from '../../examples/primitives/effects/effects-routing.config';
import { LinkedSignalRoutingConfig } from '../../examples/primitives/linked-signal/linked-signal-routing.config';
import { ResourceRoutingConfig } from '../../examples/primitives/resource/resource-routing.config';
import { BaseSignalsRoutingCategory } from '../../examples/primitives/base-signals/base-signals-routing.config';

@Component({
  selector: 'app-header',
  imports: [MatAnchor, RouterLink, MatMenuModule],
  template: ` <nav>
    <span>It's a Sign(al)!</span>
    <section class="links-section">
      @for (category of routingCategories; track category.id) {
        <a mat-button [matMenuTriggerFor]="menu">{{ category.name }}</a>
        <mat-menu #menu>
          @for (item of category.items; track item.id) {
            <button mat-menu-item [routerLink]="item.route">
              {{ item.name }}
            </button>
          }
        </mat-menu>
      }
    </section>
  </nav>`,
  styleUrl: 'header.component.scss',
})
export class HeaderComponent {
  protected readonly routingCategories: HeaderRoutingCategory[] = [
    BaseSignalsRoutingCategory,
    EffectsRoutingCategory,
    DonAndDontsRoutingConfig,
    LinkedSignalRoutingConfig,
    StateManagementRoutingConfig,
    ResourceRoutingConfig,
  ];
}
