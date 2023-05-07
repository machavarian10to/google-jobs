import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss'],
})
export class JobDescriptionComponent implements OnInit {
  defaultSearch: string = 'developer';
  defaultLocation: string = 'tbilisi';

  id: any;
  query!: string;
  location!: string;
  page!: number;
  remoteEnabled!: number;
  job: any;
  loading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    // scroll to top when navigate to new route
    this.scrollToTop();

    this.getJob();
  }

  getJob(): void{
    this.loading = true;
    this.getParams();
    this.jobService.getJobById(this.id, this.query, this.page, this.location, this.remoteEnabled).subscribe(data => {
      this.job = data;
      this.loading = false;
    });
  }

  getParams(): void{
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
      this.remoteEnabled = params['remoteEnabled'];

      if(!params['query']){
        this.query = this.defaultSearch;
      }else {
        this.query = params['query'];
      }

      if(!params['location']){
        this.location  = this.defaultLocation;
      }else {
        this.location = params['location'];
      }
    });
  }

  scrollToTop(): void{
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
}
