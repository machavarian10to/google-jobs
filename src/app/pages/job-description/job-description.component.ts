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
  id: any;
  page!: number;
  job: any;
  description: any;
  loading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    // scroll to top when navigate to new route
    this.scrollToTop();

    this.getJob();
  }

  getJob(): void{
    this.loading = true; 
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
    });
    this.jobService.getJobById(this.id, this.page).subscribe(data => {
      this.description = data.description.replace(/\n/g, '<br>');
      this.job = data;
      this.loading = false;
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
