import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-responder-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  template: `
    <div class="main-layout">
      <app-sidebar></app-sidebar>
      
      <main class="content">
        <header>
          <h1>Responder Portal</h1>
          <p class="text-secondary">Manage your assigned rescue tasks and report progress</p>
        </header>

        <div class="dashboard-grid">
          <div class="glass-card stat-card">
            <div class="stat-label">Assigned Tasks</div>
            <div class="stat-value text-primary">{{ tasks.length }}</div>
            <div class="text-xs opacity-50">Tasks linked to your account</div>
          </div>

          <div class="glass-card stat-card">
            <div class="stat-label">Pending Actions</div>
            <div class="stat-value text-warning">{{ pendingCount }}</div>
            <div class="text-xs opacity-50">Requires urgent response</div>
          </div>
        </div>

        <section class="mt-12">
          <h3>My Rescue Assignments</h3>
          <div class="grid gap-4 mt-4">
            <div *ngFor="let task of tasks" class="glass-card flex justify-between items-center">
              <div>
                <h4 class="m-0">{{ task.disaster?.type }} - {{ task.disaster?.location }}</h4>
                <p class="text-sm opacity-70">{{ task.description }}</p>
              </div>
              <div class="flex items-center gap-4">
                <span class="badge" [ngClass]="getStatusClass(task.taskStatus)">{{ task.taskStatus }}</span>
                <select (change)="updateStatus(task.id, $event)" class="status-select">
                   <option [selected]="task.taskStatus === 'Pending'" value="Pending">Pending</option>
                   <option [selected]="task.taskStatus === 'Ongoing'" value="Ongoing">Ongoing</option>
                   <option [selected]="task.taskStatus === 'Completed'" value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .mt-12 { margin-top: 3rem; }
    .mt-4 { margin-top: 1rem; }
    .gap-4 { gap: 1rem; }
    .grid { display: grid; }
    .flex { display: flex; }
    .justify-between { justify-content: space-between; }
    .items-center { align-items: center; }
    .m-0 { margin: 0; }
    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .badge-pending { background: #fef3c7; color: #92400e; }
    .badge-ongoing { background: #dbeafe; color: #1e40af; }
    .badge-completed { background: #dcfce7; color: #166534; }
    .status-select {
      background: var(--surface);
      color: var(--text-primary);
      border: 1px solid #d1d5db;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      outline: none;
    }
  `]
})
export class ResponderDashboardComponent implements OnInit {
  private http = inject(HttpClient);
  tasks: any[] = [];
  pendingCount = 0;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<any[]>('http://localhost:8080/api/tasks').subscribe(data => {
      this.tasks = data;
      this.pendingCount = data.filter(t => t.taskStatus === 'Pending').length;
    });
  }

  updateStatus(taskId: number, event: any) {
    const status = event.target.value;
    this.http.patch(`http://localhost:8080/api/tasks/${taskId}/status?status=${status}`, {}).subscribe(() => {
      this.loadTasks();
    });
  }

  getStatusClass(status: string) {
    return `badge-${status.toLowerCase()}`;
  }
}
