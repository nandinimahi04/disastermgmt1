import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AlertService } from '../../services/alert.service';
import { DisasterService } from '../../services/disaster.service';

@Component({
  selector: 'app-alert-broadcast',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  template: `
    <div class="main-layout">
      <app-sidebar></app-sidebar>
      <main class="content">
        <h1>Broadcast Alert</h1>
        <p class="text-secondary">Send immediate notifications to citizens in affected regions.</p>

        <div class="glass-card mt-8 max-w-2xl">
          <form (ngSubmit)="sendAlert()">
            <div class="form-group">
              <label>Select Linked Disaster</label>
              <select [(ngModel)]="alert.disasterId" name="disasterId" required>
                <option *ngFor="let d of disasters" [value]="d.id">
                  {{ d.type }} - {{ d.location }} ({{ d.severity }})
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Target Region</label>
              <input type="text" [(ngModel)]="alert.region" name="region" required placeholder="e.g. Kerala, India">
            </div>

            <div class="form-group">
              <label>Alert Message</label>
              <textarea [(ngModel)]="alert.message" name="message" required placeholder="Enter safety instructions or warning details..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary w-full py-4">
               🚀 Broadcast Live Alert
            </button>
          </form>
        </div>

        <div class="mt-12">
            <h3>Previous Broadcasts</h3>
            <div class="grid gap-4 mt-4">
                <div *ngFor="let a of recentAlerts" class="glass-card">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-primary">{{ a.disaster?.type }}</span>
                        <span class="text-xs opacity-50">{{ a.broadcastTime | date:'medium' }}</span>
                    </div>
                    <p class="mt-2 text-sm">{{ a.message }}</p>
                    <div class="mt-2 text-xs opacity-70">📍 {{ a.region }}</div>
                </div>
            </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .max-w-2xl { max-width: 42rem; }
    .mt-8 { margin-top: 2rem; }
    .mt-12 { margin-top: 3rem; }
    .mt-4 { margin-top: 1rem; }
    .w-full { width: 100%; }
    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  `]
})
export class AlertBroadcastComponent implements OnInit {
  private alertService = inject(AlertService);
  private disasterService = inject(DisasterService);

  disasters: any[] = [];
  recentAlerts: any[] = [];
  alert = {
    disasterId: null,
    region: '',
    message: ''
  };

  ngOnInit() {
    this.disasterService.getAll().subscribe(data => {
      this.disasters = data;
      if (data.length > 0) this.alert.disasterId = data[0].id;
    });
    this.loadRecentAlerts();
  }

  loadRecentAlerts() {
    this.alertService.getAll().subscribe(data => this.recentAlerts = data);
  }

  sendAlert() {
    const payload = {
      disaster: { id: this.alert.disasterId },
      message: this.alert.message,
      region: this.alert.region
    };
    this.alertService.broadcast(payload).subscribe(() => {
      this.loadRecentAlerts();
      this.alert.message = '';
      alert('Alert broadcasted successfully!');
    });
  }
}
