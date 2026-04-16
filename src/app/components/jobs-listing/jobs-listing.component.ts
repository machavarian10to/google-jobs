import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobs-listing',
  templateUrl: './jobs-listing.component.html',
  styleUrls: ['./jobs-listing.component.scss'],
})
export class JobsListingComponent implements OnInit, OnChanges {
  jobs: any[] = [];
  page: number = 0;
  loading: boolean = false;
  errorMessage: string = '';
  defaultSearch: string = 'developer';
  defaultLocation: string = 'Georgia';

  @Input() jobSearch!: string;
  @Input() locationSearch!: string;
  @Input() selectedCity!: string;
  @Input() remoteEnabled!: number;

  @ViewChild('scrollToTop') scrollToTop!: ElementRef;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobs(this.defaultSearch, this.page, this.defaultLocation, this.remoteEnabled);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCity'] && !changes['selectedCity'].isFirstChange()) {
      if (!this.jobSearch) this.jobSearch = this.defaultSearch;
      this.locationSearch = this.selectedCity;
      this.fetchJobs(this.jobSearch, this.page, this.locationSearch, this.remoteEnabled);
    }

    if (changes['remoteEnabled'] && !changes['remoteEnabled'].isFirstChange()) {
      if (!this.locationSearch) this.locationSearch = this.defaultLocation;
      this.remoteEnabled = this.remoteEnabled ? 1 : 0;
      this.fetchJobs(this.jobSearch || this.defaultSearch, this.page, this.locationSearch, this.remoteEnabled);
    }
  }

  fetchJobs(query: string, page: number, location: string, remote: any) {
    this.loading = true;
    this.errorMessage = '';
    this.jobService.getJobs(query, page, location, remote).subscribe({
      next: (data) => {
        this.jobs = data.jobs_results || [];
        this.errorMessage = data.error || '';
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
        this.errorMessage = e?.error?.error || e?.message || 'Something went wrong. Please try again.';
      },
    });
  }

  onJobSearch(query: string) {
    if (!this.locationSearch) this.locationSearch = this.defaultLocation;
    this.fetchJobs(query, this.page, this.locationSearch, this.remoteEnabled);
  }

  onLocationSearch(location: string) {
    if (!this.jobSearch) this.jobSearch = this.defaultSearch;
    this.locationSearch = location;
    return this.fetchJobs(this.jobSearch, this.page, location, this.remoteEnabled);
  }

  onPageChanged(e: any) {
    this.page = e.pageIndex * 10;
    if (!this.jobSearch) this.jobSearch = this.defaultSearch;
    if (!this.locationSearch) this.locationSearch = this.defaultLocation;
    this.fetchJobs(this.jobSearch, this.page, this.locationSearch, this.remoteEnabled);
    this.scrollToTopOfPage();
  }

  scrollToTopOfPage() {
    this.scrollToTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
