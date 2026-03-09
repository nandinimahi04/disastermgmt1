import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ResponderDashboardComponent } from './responder-dashboard.component';
import { CitizenDashboardComponent } from './citizen-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AdminDashboardComponent,
    ResponderDashboardComponent,
    CitizenDashboardComponent
  ],
  template: `
    <ng-container [ngSwitch]="userRole">
      <app-admin-dashboard *ngSwitchCase="'ROLE_ADMIN'"></app-admin-dashboard>
      <app-responder-dashboard *ngSwitchCase="'ROLE_RESPONDER'"></app-responder-dashboard>
      <app-citizen-dashboard *ngSwitchCase="'ROLE_CITIZEN'"></app-citizen-dashboard>
      <div *ngSwitchDefault class="p-12 text-center">
        <h2>Loading profile...</h2>
        <p>If this takes too long, please try logging in again.</p>
      </div>
    </ng-container>
  `
})
export class DashboardComponent {
  authService = inject(AuthService);
  userRole = this.authService.getUser()?.role;
}
