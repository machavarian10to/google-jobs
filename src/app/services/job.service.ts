import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getJobs(page: number): Observable<any>{
    return this.http.get(`${this.apiUrl}&q=developer&start=${page}&gl=us`)
  }

  getJobById(id: any, page: any): Observable<any> {
    return this.getJobs(page).pipe(
      map((job: { jobs_results: any[]; }) => job.jobs_results.find((j: { job_id: any; }) => j.job_id === id))
    );
  }
}
