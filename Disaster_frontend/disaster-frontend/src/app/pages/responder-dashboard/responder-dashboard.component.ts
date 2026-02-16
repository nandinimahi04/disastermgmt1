import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-responder-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './responder-dashboard.component.html',
    styleUrl: './responder-dashboard.component.css'
})
export class ResponderDashboardComponent {
    responderName = 'Responder One';
    incidents = [
        {
            type: 'Structural Fire',
            priority: 'HIGH',
            title: 'Sector 7 Industrial Complex',
            description: 'Massive fire reported in chemical storage unit. Structure integrity compromised. Evacuation in progress.',
            location: 'Industrial District, West Side'
        },
        {
            type: 'Medical Emergency',
            priority: 'URGENT',
            title: 'Downtown Transit Center',
            description: 'Major transit derailment. Multiple casualties reported. Medical units requested for triage and stabilization.',
            location: 'Central Plaza Terminal'
        }
    ];

    constructor(private auth: AuthService, private router: Router) { }

    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }
}
