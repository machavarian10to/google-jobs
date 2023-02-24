import { Component, ViewChild } from '@angular/core';
import { JobsListingComponent } from 'src/app/components/jobs-listing/jobs-listing.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(JobsListingComponent) jobsListingComponent!: JobsListingComponent;

  jobSearch!: string;
  locationSearch!: string;
  selectedCity!: string;

  cities: string[] = ['London', 'Rome', 'Amsterdam', 'Berlin', 'Madrid'];

  onCityChange(city: string): void{
    this.locationSearch = "";
    this.selectedCity = city;
  }

  onJobSearch(): void {
    if(!this.jobSearch && !this.locationSearch && !this.selectedCity) return alert('Search word must not be empty!')
    if (this.jobSearch.indexOf(' ') !== -1) {
      this.jobSearch = this.jobSearch.replace(/ /g, '+');
    }
    this.jobsListingComponent.onJobSearch(this.jobSearch);
    this.jobSearch = this.jobSearch.replace(/\+/g, ' ');
  };

  onLocationSearch(): void { 
    this.selectedCity = "";
    if(!this.jobSearch && !this.locationSearch) return alert('Search word must not be empty!')
    if (this.locationSearch.indexOf(' ') !== -1) {
      this.locationSearch = this.locationSearch.replace(/ /g, '+');
    }
    this.jobsListingComponent.onLocationSearch(this.locationSearch);
    this.locationSearch = this.locationSearch.replace(/\+/g, ' ');
  };
}
