import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
    userName = 'User';

    constructor(private auth: AuthService, private router: Router) { }

    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }
}
