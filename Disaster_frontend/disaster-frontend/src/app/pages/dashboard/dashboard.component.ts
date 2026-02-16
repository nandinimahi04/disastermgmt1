import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule],
  standalone: true
})
export class DashboardComponent {
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    const role = (this.auth.getRole() || '').toLowerCase();
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (role === 'responder') {
      this.router.navigate(['/responder']);
    } else {
      this.router.navigate(['/user']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}