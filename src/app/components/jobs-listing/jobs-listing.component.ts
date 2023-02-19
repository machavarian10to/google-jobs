import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs-listing',
  templateUrl: './jobs-listing.component.html',
  styleUrls: ['./jobs-listing.component.scss']
})
export class JobsListingComponent {
  jobs = [1, 2, 3, 4, 5];
}
