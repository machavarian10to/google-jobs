import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/job.service';


@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss'],
})
export class JobDescriptionComponent implements OnInit {
  id: any;
  job: any;

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.jobService.getJobById(this.id).subscribe(data => {
      this.job = data;
    });
  }
}
