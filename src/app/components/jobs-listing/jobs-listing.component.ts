import { Component, ViewChild, ElementRef, Input } from '@angular/core';
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
  defaultSearch: string = 'developer'
  defaultRemote: number = 0;
  defaultLocation: string = 'tbilisi'

  @Input() remoteEnabled: any;
  @Input() jobSearch!: string;
  @Input() locationSearch!: string;

  @ViewChild('scrollToTop') scrollToTop!: ElementRef;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.remoteEnabled = this.remoteEnabled ? 1 : 0;
    this.fetchJobs(this.defaultSearch, this.page, this.defaultLocation, this.defaultRemote);
  }

  fetchJobs(query: string, page: number, location:string, remote: number) {
    this.loading = true;
    this.jobService.getJobs(query, page, location, remote).subscribe(
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

  onJobSearch(query: string){
    if(!this.locationSearch) {
      this.locationSearch = this.defaultLocation;
    }
    this.fetchJobs(query, this.page, this.locationSearch, this.remoteEnabled);
  }

  onLocationSearch(location: string){
    if(!this.jobSearch) {
      this.jobSearch = this.defaultSearch;
    }
    this.fetchJobs(this.jobSearch, this.page, location, this.remoteEnabled);
  }

  onPageChanged(e: any){
    this.page = e.pageIndex * 10;
    this.fetchJobs(this.jobSearch, this.page, this.locationSearch, this.remoteEnabled);
    this.scrollToTopOfPage();
  }

  scrollToTopOfPage() {
    this.scrollToTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
