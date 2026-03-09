import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar">
      <div class="logo">
        <span class="icon">🚨</span>
        <span class="text" style="color: var(--primary)">DisasterMgmt</span>
      </div>
      
      <nav class="nav-links">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <span class="icon">📊</span>
          <span class="text">Dashboard</span>
        </a>
        
        <a *ngIf="userRole === 'ROLE_ADMIN'" routerLink="/disasters" routerLinkActive="active" class="nav-item">
          <span class="icon">🌋</span>
          <span class="text">Manage Disasters</span>
        </a>

        <a *ngIf="userRole === 'ROLE_ADMIN'" routerLink="/alerts/broadcast" routerLinkActive="active" class="nav-item">
          <span class="icon">📢</span>
          <span class="text">Broadcast Alert</span>
        </a>

        <a *ngIf="userRole === 'ROLE_RESPONDER' || userRole === 'ROLE_ADMIN'" routerLink="/tasks" routerLinkActive="active" class="nav-item">
          <span class="icon">📋</span>
          <span class="text">Tasks</span>
        </a>

        <a *ngIf="userRole === 'ROLE_ADMIN' || userRole === 'ROLE_RESPONDER'" routerLink="/resources" routerLinkActive="active" class="nav-item">
          <span class="icon">📦</span>
          <span class="text">Resources</span>
        </a>

        <a *ngIf="userRole === 'ROLE_ADMIN'" routerLink="/incidents" routerLinkActive="active" class="nav-item">
          <span class="icon">🚨</span>
          <span class="text">Incidents</span>
        </a>

        <a *ngIf="userRole === 'ROLE_CITIZEN'" routerLink="/help" routerLinkActive="active" class="nav-item">
          <span class="icon">🆘</span>
          <span class="text">Request Help</span>
        </a>
      </nav>

      <div class="user-info">
        <div class="avatar">{{ userName?.charAt(0) }}</div>
        <div class="details">
          <div class="name">{{ userName }}</div>
          <div class="role text-xs opacity-50">{{ userRole }}</div>
        </div>
        <button (click)="logout()" class="logout-btn">🚪</button>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      height: 100vh;
      background: var(--surface);
      border-right: 1px solid var(--glass-border);
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      position: fixed;
      left: 0;
      top: 0;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 2.5rem;
    }
    .nav-links {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.875rem 1rem;
      border-radius: 0.75rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.2s;
    }
    .nav-item:hover {
      background: rgba(0, 0, 0, 0.03);
      color: var(--primary);
    }
    .nav-item.active {
      background: var(--primary);
      color: white;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
    .user-info {
      margin-top: auto;
      padding: 1rem;
      background: var(--surface-light);
      border-radius: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .avatar {
      width: 32px;
      height: 32px;
      background: var(--primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .details { flex: 1; min-width: 0; }
    .name { font-weight: 600; font-size: 0.875rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .role { font-size: 0.75rem; color: var(--text-secondary); }
    .logout-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 1.25rem;
      padding: 0.25rem;
      transition: color 0.2s;
    }
    .logout-btn:hover { color: var(--error); }
  `]
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userRole = this.authService.getUser()?.role;
  userName = this.authService.getUser()?.username; // Email is used as username currently

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
