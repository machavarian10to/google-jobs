import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent {
  @Input() job: any;
  @Input() page!: number;
  @Input() query!: string;
  @Input() location!: string;
}
