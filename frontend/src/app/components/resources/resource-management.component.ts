import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ResourceService } from '../../services/resource.service';

@Component({
    selector: 'app-resource-management',
    standalone: true,
    imports: [CommonModule, FormsModule, SidebarComponent],
    template: `
    <div class="main-layout">
      <app-sidebar></app-sidebar>
      <main class="content">
        <header class="flex justify-between items-center mb-8">
          <div>
            <h1>Emergency Resource Inventory</h1>
            <p class="text-secondary">Track food, water, and medical supplies across base camps</p>
          </div>
          <button (click)="showAddForm = !showAddForm" class="btn btn-primary">
            {{ showAddForm ? 'Close Form' : '+ Add New Stock' }}
          </button>
        </header>

        <div *ngIf="showAddForm" class="glass-card mb-8 animate-fade-in">
          <h3>Register New Resource Batch</h3>
          <form (ngSubmit)="saveResource()" class="mt-4 grid grid-cols-3 gap-4">
            <div class="form-group">
              <label>Resource Name</label>
              <input type="text" [(ngModel)]="newResource.name" name="name" required placeholder="e.g. Bottled Water">
            </div>
            <div class="form-group">
              <label>Category</label>
              <select [(ngModel)]="newResource.category" name="category" required>
                <option value="Supplies">Supplies</option>
                <option value="Medical">Medical</option>
                <option value="Food">Food</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
            <div class="form-group">
              <label>Quantity</label>
              <input type="number" [(ngModel)]="newResource.quantity" name="quantity" required>
            </div>
            <div class="form-group">
              <label>Unit</label>
              <input type="text" [(ngModel)]="newResource.unit" name="unit" required placeholder="e.g. Liters">
            </div>
            <div class="form-group col-span-2">
              <label>Current Location</label>
              <input type="text" [(ngModel)]="newResource.location" name="location" required placeholder="e.g. Warehouse A">
            </div>
            <button type="submit" class="btn btn-primary col-span-3">Update Inventory Record</button>
          </form>
        </div>

        <div class="grid grid-cols-4 gap-6">
          <div *ngFor="let r of resources" class="glass-card resource-card">
            <div class="flex justify-between mb-4">
               <span class="category-tag" [ngClass]="r.category.toLowerCase()">{{ r.category }}</span>
               <button (click)="deleteResource(r.id)" class="text-error opacity-30 hover:opacity-100 transition">🗑️</button>
            </div>
            <h2 class="m-0">{{ r.quantity }} <small>{{ r.unit }}</small></h2>
            <h4 class="mt-2 text-primary">{{ r.name }}</h4>
            <div class="mt-4 flex items-center gap-2 text-sm opacity-60">
              <span>📍 {{ r.location }}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
    styles: [`
    .mb-8 { margin-bottom: 2rem; }
    .mt-4 { margin-top: 1rem; }
    .flex { display: flex; }
    .justify-between { justify-content: space-between; }
    .items-center { align-items: center; }
    .grid { display: grid; }
    .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
    .gap-4 { gap: 1rem; }
    .gap-6 { gap: 1.5rem; }
    .col-span-2 { grid-column: span 2; }
    .col-span-3 { grid-column: span 3; }
    .category-tag {
      font-size: 0.65rem;
      font-weight: 800;
      text-transform: uppercase;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      letter-spacing: 0.05em;
    }
    .supplies { background: #dcfce7; color: #166534; }
    .medical { background: #fee2e2; color: #991b1b; }
    .food { background: #fef9c3; color: #854d0e; }
    .tools { background: #e0e7ff; color: #3730a3; }
    .resource-card h2 small { font-size: 0.5em; font-weight: 400; opacity: 0.6; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  `]
})
export class ResourceManagementComponent implements OnInit {
    private resourceService = inject(ResourceService);
    resources: any[] = [];
    showAddForm = false;
    newResource = {
        name: '',
        quantity: 0,
        unit: '',
        location: '',
        category: 'Supplies'
    };

    ngOnInit() {
        this.loadResources();
    }

    loadResources() {
        this.resourceService.getAll().subscribe(data => this.resources = data);
    }

    saveResource() {
        this.resourceService.save(this.newResource).subscribe(() => {
            this.loadResources();
            this.showAddForm = false;
            this.newResource = { name: '', quantity: 0, unit: '', location: '', category: 'Supplies' };
        });
    }

    deleteResource(id: number) {
        if (confirm('Are you sure you want to remove this resource batch?')) {
            this.resourceService.delete(id).subscribe(() => this.loadResources());
        }
    }
}
