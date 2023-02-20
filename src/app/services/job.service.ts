import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getJobs(): Observable<any>{
    return this.http.get(`${this.apiUrl}&q=developer&start=0&gl=us`)
  }
}
