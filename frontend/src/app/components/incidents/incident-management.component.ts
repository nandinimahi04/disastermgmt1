import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { IncidentService } from '../../services/incident.service';

@Component({
    selector: 'app-incident-management',
    standalone: true,
    imports: [CommonModule, SidebarComponent],
    template: `
    <div class="main-layout">
      <app-sidebar></app-sidebar>
      
      <main class="content">
        <header>
          <h1>Incoming Incident Reports</h1>
          <p class="text-secondary">Review and verify crowdsourced emergency reports from citizens.</p>
        </header>

        <section class="mt-8">
          <div class="glass-card p-0 overflow-hidden">
            <table class="w-full">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Reporter</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let report of reports">
                  <td class="text-sm">{{ report.reportTime | date:'short' }}</td>
                  <td>
                    <div class="reporter-info">
                       <strong>{{ report.reporter?.name }}</strong>
                       <span class="text-xs opacity-50">{{ report.reporter?.phone }}</span>
                    </div>
                  </td>
                  <td><span class="badge">{{ report.type }}</span></td>
                  <td>{{ report.location }}</td>
                  <td>
                    <span class="severity-tag" [class]="report.severity.toLowerCase()">
                      {{ report.severity }}
                    </span>
                  </td>
                  <td>
                    <span class="status-badge" [class]="report.status.toLowerCase()">
                      {{ report.status }}
                    </span>
                  </td>
                  <td>
                    <div class="flex gap-2">
                       <button *ngIf="report.status === 'Pending'" class="btn-sm btn-success" (click)="updateStatus(report.id, 'Verified')">Verify</button>
                       <button *ngIf="report.status === 'Pending'" class="btn-sm btn-error" (click)="updateStatus(report.id, 'Dismissed')">Dismiss</button>
                       <button *ngIf="report.status === 'Verified'" class="btn-sm btn-primary" (click)="updateStatus(report.id, 'Resolved')">Resolve</button>
                    </div>
                  </td>
                </tr>
                <tr *ngIf="reports.length === 0">
                  <td colspan="7" class="text-center py-8 opacity-50">No new incident reports found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="mt-12" *ngIf="selectedReport">
           <div class="glass-card">
              <h3>Report Details</h3>
              <p><strong>Description:</strong> {{ selectedReport.description }}</p>
           </div>
        </section>
      </main>
    </div>
  `,
    styles: [`
    .mt-8 { margin-top: 2rem; }
    .mt-12 { margin-top: 3rem; }
    .w-full { width: 100%; }
    table { border-collapse: collapse; text-align: left; }
    th { padding: 1rem; background: rgba(0,0,0,0.02); font-size: 0.875rem; border-bottom: 1px solid var(--glass-border); }
    td { padding: 1rem; border-bottom: 1px solid var(--glass-border); }
    
    .reporter-info { display: flex; flex-direction: column; }
    .text-xs { font-size: 0.75rem; }
    .text-sm { font-size: 0.875rem; }
    
    .badge { padding: 0.25rem 0.5rem; background: #f1f5f9; border-radius: 99px; font-size: 0.75rem; font-weight: 600; }
    
    .severity-tag { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
    .severity-tag.critical { color: #dc2626; }
    .severity-tag.high { color: #ea580c; }
    .severity-tag.medium { color: #ca8a04; }
    .severity-tag.low { color: #16a34a; }
    
    .status-badge { font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 4px; }
    .status-badge.pending { background: #fef9c3; color: #854d0e; }
    .status-badge.verified { background: #dcfce7; color: #166534; }
    .status-badge.resolved { background: #dbeafe; color: #1e40af; }
    .status-badge.dismissed { background: #fee2e2; color: #991b1b; }
    
    .btn-sm { padding: 0.4rem 0.8rem; border-radius: 0.4rem; border: none; font-size: 0.75rem; font-weight: 600; cursor: pointer; }
    .btn-success { background: #22c55e; color: white; }
    .btn-error { background: #ef4444; color: white; }
    .btn-primary { background: var(--primary); color: white; }
    .flex { display: flex; }
    .gap-2 { gap: 0.5rem; }
  `]
})
export class IncidentManagementComponent implements OnInit {
    private incidentService = inject(IncidentService);
    reports: any[] = [];
    selectedReport: any = null;

    ngOnInit() {
        this.loadReports();
    }

    loadReports() {
        this.incidentService.getAll().subscribe(data => {
            this.reports = data;
        });
    }

    updateStatus(id: number, status: string) {
        this.incidentService.updateStatus(id, status).subscribe(() => {
            this.loadReports();
        });
    }
}
