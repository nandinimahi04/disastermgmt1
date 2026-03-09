import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="glass-card auth-card">
        <h2>Create Account</h2>
        <p class="subtitle">Join the disaster management network</p>
        
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" [(ngModel)]="name" name="name" required placeholder="John Doe">
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="name@example.com">
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" required placeholder="Min 6 characters">
          </div>

          <div class="grid">
            <div class="form-group">
              <label>Phone Number</label>
              <input type="text" [(ngModel)]="phone" name="phone" required placeholder="+1 234 567 890">
            </div>

            <div class="form-group">
              <label>Region</label>
              <input type="text" [(ngModel)]="region" name="region" required placeholder="e.g. California">
            </div>
          </div>

          <div class="form-group">
            <label>Role</label>
            <select [(ngModel)]="role" name="role">
              <option value="CITIZEN">Citizen</option>
              <option value="RESPONDER">Responder</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          
          <div *ngIf="error" class="error-msg">{{ error }}</div>
          <div *ngIf="success" class="success-msg">{{ success }}</div>
          
          <button type="submit" class="btn btn-primary w-full" [disabled]="loading">
            {{ loading ? 'Creating account...' : 'Register' }}
          </button>
        </form>
        
        <div class="auth-footer">
          Already have an account? <a routerLink="/login">Sign in</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    }
    .auth-card { width: 100%; max-width: 400px; }
    h2 { margin-bottom: 0.5rem; text-align: center; }
    .subtitle { color: var(--text-secondary); text-align: center; margin-bottom: 2rem; font-size: 0.875rem; }
    .w-full { width: 100%; }
    .error-msg {
      color: var(--error);
      background: rgba(239, 68, 68, 0.1);
      padding: 0.75rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      text-align: center;
    }
    .success-msg {
      color: var(--success);
      background: rgba(16, 185, 129, 0.1);
      padding: 0.75rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      text-align: center;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .auth-footer { margin-top: 1.5rem; text-align: center; font-size: 0.875rem; color: var(--text-secondary); }
    a { color: var(--primary); text-decoration: none; font-weight: 600; }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  phone = '';
  region = '';
  role = 'CITIZEN';
  loading = false;
  error = '';
  success = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.success = '';
    this.authService.register(this.name, this.email, this.password, this.role, this.phone, this.region).subscribe({
      next: () => {
        this.success = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
