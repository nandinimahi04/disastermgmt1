import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private apiUrl = 'http://localhost:8080/api/alerts';
    private http = inject(HttpClient);

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    broadcast(alert: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/broadcast`, alert);
    }

    getByRegion(region: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/region/${region}`);
    }
}
