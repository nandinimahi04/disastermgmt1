import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResourceService {
    private apiUrl = 'http://localhost:8080/api/resources';
    private http = inject(HttpClient);

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    save(resource: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, resource);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
