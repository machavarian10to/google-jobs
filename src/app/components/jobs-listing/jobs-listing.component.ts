import { Component, ViewChild,ElementRef } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobs-listing',
  templateUrl: './jobs-listing.component.html',
  styleUrls: ['./jobs-listing.component.scss']
})
export class JobsListingComponent {
  jobs: any[] = [];
  page: number = 0;
  loading: boolean = false;

  @ViewChild('scrollToTop') scrollToTop!: ElementRef;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.fetchJobs(this.page);
  }


  fetchJobs(page: number) {
    this.loading = true;
    this.jobService.getJobs(page).subscribe(
      (data) => {
        this.jobs = data.jobs_results;
        this.loading = false;
        console.log(data);
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }
  

  onPageChanged(e: any){
    this.page = e.pageIndex * 10;
    this.fetchJobs(this.page);
    this.scrollToTopOfPage();
  }

  scrollToTopOfPage() {
    this.scrollToTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
