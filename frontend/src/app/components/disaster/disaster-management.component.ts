import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DisasterService } from '../../services/disaster.service';

@Component({
  selector: 'app-disaster-management',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  template: `
    <div class="main-layout">
      <app-sidebar></app-sidebar>
      <main class="content">
        <h1>Disaster Management</h1>
        
        <div class="glass-card mb-8">
          <h3>Register New Disaster Event</h3>
          <form (ngSubmit)="saveDisaster()" class="mt-4 grid grid-cols-2 gap-4">
            <div class="form-group">
              <label>Disaster Type</label>
              <select [(ngModel)]="newDisaster.type" name="type" required>
                <option value="Flood">Flood</option>
                <option value="Earthquake">Earthquake</option>
                <option value="Wildfire">Wildfire</option>
                <option value="Cyclone">Cyclone</option>
                <option value="Fire">Fire</option>
              </select>
            </div>
            <div class="form-group">
              <label>Location</label>
              <input type="text" [(ngModel)]="newDisaster.location" name="location" required placeholder="City, Country">
            </div>
            <div class="form-group">
              <label>Severity</label>
              <select [(ngModel)]="newDisaster.severity" name="severity" required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select [(ngModel)]="newDisaster.status" name="status" required>
                <option value="Active">Active</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div class="form-group col-span-2">
              <label>Description</label>
              <textarea [(ngModel)]="newDisaster.description" name="description" placeholder="Provide details about the incident..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary col-span-2">Save Disaster Event</button>
          </form>
        </div>

        <div class="glass-card">
          <h3>Ongoing Disasters</h3>
          <table class="w-full mt-4">
            <thead>
              <tr class="text-left border-b border-glass-border">
                <th class="p-2">Type</th>
                <th class="p-2">Location</th>
                <th class="p-2">Severity</th>
                <th class="p-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let d of disasters" class="border-b border-glass-border">
                <td class="p-2">{{ d.type }}</td>
                <td class="p-2">{{ d.location }}</td>
                <td class="p-2">{{ d.severity }}</td>
                <td class="p-2 opacity-50">{{ d.timestamp | date:'short' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .mb-8 { margin-bottom: 2rem; }
    .mt-4 { margin-top: 1rem; }
    .grid { display: grid; }
    .grid-cols-2 { grid-template-columns: 1fr 1fr; }
    .gap-4 { gap: 1rem; }
    .col-span-2 { grid-column: span 2; }
    .w-full { width: 100%; }
  `]
})
export class DisasterManagementComponent implements OnInit {
  private disasterService = inject(DisasterService);
  disasters: any[] = [];
  newDisaster = {
    type: 'Flood',
    location: '',
    severity: 'Medium',
    status: 'Active',
    description: ''
  };

  ngOnInit() {
    this.loadDisasters();
  }

  loadDisasters() {
    this.disasterService.getAll().subscribe(data => this.disasters = data);
  }

  saveDisaster() {
    this.disasterService.create(this.newDisaster).subscribe(() => {
      this.loadDisasters();
      this.newDisaster = { type: 'Flood', location: '', severity: 'Medium', status: 'Active', description: '' };
    });
  }
}
