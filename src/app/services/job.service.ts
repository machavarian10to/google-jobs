import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getJobs(query: string, page: number, location: string, remote: any): Observable<any>{
    return this.http.get(`${this.apiUrl}&q=${query}&start=${page}&location=${location}&ltype=${remote}`)
  }

  getJobById(id: string, query: string, page: number, location: string, remote: any): Observable<any> {
    return this.getJobs(query, page, location, remote).pipe(
      map((job: { jobs_results: any[]; }) => job.jobs_results.find((j: { job_id: any; }) => j.job_id === id))
    );
  }
}
