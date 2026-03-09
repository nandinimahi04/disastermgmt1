import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IncidentService {
    private apiUrl = 'http://localhost:8080/api/incidents';
    private http = inject(HttpClient);

    createReport(report: any): Observable<any> {
        return this.http.post(this.apiUrl, report);
    }

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getMyReports(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/my-reports/${userId}`);
    }

    updateStatus(id: number, status: string): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}/status?status=${status}`, {});
    }
}
