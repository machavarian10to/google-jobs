import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  jobSearch: string = ""
  locationSearch: string = ""

  cities: string[] = ['London', 'Amsterdam', 'New York', 'Berlin'];


  onJobSearch(): void { 
    console.log(this.jobSearch);
    this.jobSearch = "";
  };

  onLocationSearch(): void { 
    console.log(this.locationSearch);
    this.locationSearch = "";
  };
}
