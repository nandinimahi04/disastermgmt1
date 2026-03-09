import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisasterManagementComponent } from './components/disaster/disaster-management.component';
import { AlertBroadcastComponent } from './components/alert/alert-broadcast.component';
import { ResponderDashboardComponent } from './components/dashboard/responder-dashboard.component';
import { ResourceManagementComponent } from './components/resources/resource-management.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'disasters', component: DisasterManagementComponent, canActivate: [authGuard] },
    { path: 'alerts/broadcast', component: AlertBroadcastComponent, canActivate: [authGuard] },
    { path: 'tasks', component: ResponderDashboardComponent, canActivate: [authGuard] },
    { path: 'resources', component: ResourceManagementComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
