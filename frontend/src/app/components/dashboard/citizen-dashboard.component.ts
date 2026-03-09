import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../services/alert.service';
import { IncidentService } from '../../services/incident.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-citizen-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  template: `
    <div class="main-layout">
      <app-sidebar></app-sidebar>
      
      <main class="content">
        <header>
          <h1>Disaster Alerts & Safety</h1>
          <p class="text-secondary">Stay informed about disasters in your region: <strong>{{ userRegion }}</strong></p>
        </header>

        <section class="mt-8">
           <div class="glass-card bg-red-50 border-red-200 mb-8 p-6 flex justify-between items-center" style="background: #fef2f2; border: 1px solid #fee2e2;">
             <div>
               <h2 class="m-0 text-red-700" style="color: #b91c1c">Need Emergency Assistance?</h2>
               <p class="m-0 text-sm opacity-70" style="color: #7f1d1d">Submit a request and we'll dispatch the nearest responder.</p>
             </div>
             <button (click)="showReportForm = true" class="btn btn-primary">Report Incident / SOS 🆘</button>
           </div>
        </section>

        <!-- Incident Report Modal -->
        <div *ngIf="showReportForm" class="modal-overlay">
          <div class="glass-card modal-content">
            <h3>Report Emergency Incident</h3>
            <p class="text-secondary">Provide details to alert authorities immediately.</p>
            
            <form (ngSubmit)="submitReport()">
              <div class="form-group">
                <label>Incident Type</label>
                <select [(ngModel)]="newReport.type" name="type" required>
                  <option value="Fire">Fire</option>
                  <option value="Flood">Flood</option>
                  <option value="Medical">Medical Emergency</option>
                  <option value="Accident">Accident</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label>Location</label>
                <input type="text" [(ngModel)]="newReport.location" name="location" required placeholder="Street, City or Landmarker">
              </div>

              <div class="form-group">
                <label>Severity</label>
                <select [(ngModel)]="newReport.severity" name="severity" required>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div class="form-group">
                <label>Description</label>
                <textarea [(ngModel)]="newReport.description" name="description" rows="3" placeholder="Explain the situation..."></textarea>
              </div>

              <div class="flex justify-end gap-2 mt-4">
                <button type="button" class="btn-ghost" (click)="showReportForm = false">Cancel</button>
                <button type="submit" class="btn btn-primary" [disabled]="loading">
                  {{ loading ? 'Submitting...' : 'Submit Official Report' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <section class="mt-12">
          <h3>Active Alerts in Your Area</h3>
          <div class="grid-alerts mt-4">
            <div *ngFor="let alert of alerts" class="glass-card alert-item" [class.urgent]="isUrgent(alert)">
              <div class="flex justify-between">
                 <span class="severity">{{ alert.disaster?.severity }}</span>
                 <span class="time">{{ alert.broadcastTime | date:'shortTime' }}</span>
              </div>
              <h4>{{ alert.disaster?.type }} Alert</h4>
              <p>{{ alert.message }}</p>
              <div class="location-tag">📍 {{ alert.disaster?.location }}</div>
            </div>
            
            <div *ngIf="alerts.length === 0" class="glass-card text-center py-12 opacity-50">
               No active alerts for your region at this time. Stay safe!
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .mt-8 { margin-top: 2rem; }
    .mt-12 { margin-top: 3rem; }
    .mt-4 { margin-top: 1rem; }
    .mb-8 { margin-bottom: 2rem; }
    .flex { display: flex; }
    .justify-between { justify-content: space-between; }
    .items-center { align-items: center; }
    .m-0 { margin: 0; }
    .text-sm { font-size: 0.875rem; }
    .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
    .grid-alerts { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; }
    .alert-item { border-left: 4px solid var(--primary); }
    .alert-item.urgent { border-left-color: var(--error); background: rgba(239, 68, 68, 0.05); }
    .severity { font-weight: 800; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; color: var(--primary); }
    .urgent .severity { color: var(--error); }
    .time { font-size: 0.75rem; opacity: 0.5; }
    h4 { margin: 0.75rem 0 0.5rem; }
    .location-tag { margin-top: 1rem; font-size: 0.875rem; font-weight: 600; opacity: 0.8; }
    
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center; z-index: 1000;
    }
    .modal-content { width: 90%; max-width: 500px; padding: 2rem; position: relative; }
    .justify-end { justify-content: flex-end; }
    .gap-2 { gap: 0.5rem; }
    .btn-ghost { background: transparent; border: none; padding: 0.5rem 1rem; cursor: pointer; color: var(--text-secondary); font-weight: 600; }
  `]
})
export class CitizenDashboardComponent implements OnInit {
  private alertService = inject(AlertService);
  private incidentService = inject(IncidentService);

  user = JSON.parse(localStorage.getItem('user') || '{}');
  userRegion = this.user.region || 'Global';
  alerts: any[] = [];

  showReportForm = false;
  loading = false;
  newReport = {
    type: 'Fire',
    location: '',
    severity: 'Medium',
    description: ''
  };

  ngOnInit() {
    this.loadAlerts();
  }

  loadAlerts() {
    this.alertService.getAll().subscribe(data => {
      this.alerts = data;
    });
  }

  submitReport() {
    this.loading = true;
    const reportData = {
      ...this.newReport,
      reporter: { id: this.user.id },
      status: 'Pending',
      reportTime: new Date().toISOString()
    };

    this.incidentService.createReport(reportData).subscribe({
      next: () => {
        alert('Your incident report has been submitted to the authorities.');
        this.showReportForm = false;
        this.loading = false;
        this.newReport = { type: 'Fire', location: '', severity: 'Medium', description: '' };
      },
      error: () => {
        alert('Failed to submit report. Please try again.');
        this.loading = false;
      }
    });
  }

  isUrgent(alert: any) {
    return alert.disaster?.severity === 'Critical' || alert.disaster?.severity === 'High';
  }
}
