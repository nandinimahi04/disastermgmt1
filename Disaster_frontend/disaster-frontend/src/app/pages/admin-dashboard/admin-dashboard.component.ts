import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
    adminName = 'Administrator';
    auditLogs = [
        {
            timestamp: '2024-02-14 10:45:12',
            action: 'Protocol Override',
            user: 'Admin_Root',
            status: 'Authorized'
        },
        {
            timestamp: '2024-02-14 10:42:05',
            action: 'Node Initialized',
            user: 'Responder_A7',
            status: 'Success'
        },
        {
            timestamp: '2024-02-14 10:38:44',
            action: 'Signal Broadcast',
            user: 'User_442',
            status: 'Active'
        }
    ];

    constructor(private auth: AuthService, private router: Router) { }

    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }
}
