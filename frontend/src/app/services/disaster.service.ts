import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DisasterService {
    private apiUrl = 'http://localhost:8080/api/disasters';
    private http = inject(HttpClient);

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    create(disaster: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, disaster);
    }
}
