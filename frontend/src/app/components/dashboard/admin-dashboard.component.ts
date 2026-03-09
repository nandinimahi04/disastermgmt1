import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DisasterService } from '../../services/disaster.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  template: `
    <div class="main-layout">
      <app-sidebar></app-sidebar>
      
      <main class="content">
        <header>
          <h1>Admin Command Center</h1>
          <p class="text-secondary">Real-time overview of disaster management operations</p>
        </header>

        <div class="dashboard-grid animate-fade-in">
          <div class="glass-card stat-card border-l-4 border-error">
            <div class="stat-label">Critical Events</div>
            <div class="stat-value text-error">{{ activeDisastersCount }}</div>
            <div class="progress-bar"><div class="progress-fill bg-error" style="width: 70%"></div></div>
          </div>

          <div class="glass-card stat-card border-l-4 border-primary">
            <div class="stat-label">Broadcast Reach</div>
            <div class="stat-value text-primary">{{ alertsCount * 120 }}+</div>
            <div class="progress-bar"><div class="progress-fill bg-primary" style="width: 45%"></div></div>
          </div>

          <div class="glass-card stat-card border-l-4 border-success">
            <div class="stat-label">Responder Efficiency</div>
            <div class="stat-value text-success">94%</div>
            <div class="progress-bar"><div class="progress-fill bg-success" style="width: 94%"></div></div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-8 mt-8 animate-fade-in-delayed">
          <div class="glass-card">
            <h3>Resource Distribution</h3>
            <div class="chart-container mt-4">
               <div class="chart-bar-group">
                  <div class="chart-bar bg-primary" style="height: 80%"></div>
                  <span class="chart-label">Kerala</span>
               </div>
               <div class="chart-bar-group">
                  <div class="chart-bar bg-warning" style="height: 45%"></div>
                  <span class="chart-label">Tokyo</span>
               </div>
               <div class="chart-bar-group">
                  <div class="chart-bar bg-success" style="height: 60%"></div>
                  <span class="chart-label">Calif.</span>
               </div>
               <div class="chart-bar-group">
                  <div class="chart-bar bg-error" style="height: 90%"></div>
                  <span class="chart-label">Sydney</span>
               </div>
            </div>
          </div>

          <div class="map-placeholder">
             <div class="map-overlay">
                <div class="pulse-marker" style="top: 40%; left: 30%"></div>
                <div class="pulse-marker" style="top: 60%; left: 70%"></div>
                <div class="pulse-marker" style="top: 20%; left: 60%"></div>
             </div>
             <div class="map-label">Geospatial Monitoring</div>
          </div>
        </div>

        <section class="mt-12">
          <h3>Recent Disaster Alerts</h3>
          <div class="glass-card mt-4 overflow-hidden">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-glass-border">
                  <th class="p-4 opacity-70">Type</th>
                  <th class="p-4 opacity-70">Location</th>
                  <th class="p-4 opacity-70">Severity</th>
                  <th class="p-4 opacity-70">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let disaster of disasters" class="border-b border-glass-border hover:bg-black/5 transition">
                  <td class="p-4 font-semibold">{{ disaster.type }}</td>
                  <td class="p-4">{{ disaster.location }}</td>
                  <td class="p-4">
                    <span class="badge" [ngClass]="getSeverityClass(disaster.severity)">
                      {{ disaster.severity }}
                    </span>
                  </td>
                  <td class="p-4">{{ disaster.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.8s ease-out; }
    .animate-fade-in-delayed { animation: fadeIn 0.8s ease-out 0.3s both; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    .border-l-4 { border-left-width: 4px; }
    .border-error { border-left-color: var(--error); }
    .border-primary { border-left-color: var(--primary); }
    .border-success { border-left-color: var(--success); }
    
    .progress-bar { height: 4px; background: rgba(0, 0, 0, 0.05); border-radius: 2px; margin-top: 1rem; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 2px; }
    .bg-error { background: var(--error); }
    .bg-primary { background: var(--primary); }
    .bg-success { background: var(--success); }

    .grid-cols-2 { display: grid; grid-template-columns: 1fr 1fr; }
    .gap-8 { gap: 2rem; }
    
    .chart-container {
      height: 200px;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      padding-top: 2rem;
      border-bottom: 2px solid var(--glass-border);
    }
    .chart-bar-group { display: flex; flex-direction: column; align-items: center; width: 40px; }
    .chart-bar { width: 100%; border-radius: 4px 4px 0 0; transition: height 1s ease-out; }
    .chart-label { font-size: 0.65rem; font-weight: 700; margin-top: 0.5rem; opacity: 0.6; }

    .map-placeholder {
      height: 100%;
      min-height: 280px;
      background: #f1f5f9;
      background-image: 
        linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px);
      background-size: 20px 20px;
      border-radius: 1.5rem;
      border: 1px solid var(--glass-border);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .map-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.4); }
    .map-label { position: absolute; top: 1.5rem; left: 1.5rem; background: var(--glass); padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; }
    
    .pulse-marker {
      position: absolute; width: 12px; height: 12px; background: var(--error); border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 1); animation: pulse-red 2s infinite;
    }
    @keyframes pulse-red {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }

    .mt-12 { margin-top: 3rem; }
    .mt-4 { margin-top: 1rem; }
    .w-full { width: 100%; }
    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .badge-critical { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
    .badge-high { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .badge-medium { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
    .badge-low { background: rgba(16, 185, 129, 0.2); color: #10b981; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  private disasterService = inject(DisasterService);
  private alertService = inject(AlertService);

  disasters: any[] = [];
  alerts: any[] = [];
  activeDisastersCount = 0;
  alertsCount = 0;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.disasterService.getAll().subscribe(data => {
      this.disasters = data;
      this.activeDisastersCount = data.filter(d => d.status === 'Active').length;
    });

    this.alertService.getAll().subscribe(data => {
      this.alerts = data;
      this.alertsCount = data.length;
    });
  }

  getSeverityClass(severity: string) {
    return `badge-${severity.toLowerCase()}`;
  }
}
