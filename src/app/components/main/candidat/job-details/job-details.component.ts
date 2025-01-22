import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPostService } from '../../../../services/job-post.service';
import { ApplicationService } from '../../../../services/application.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobPostId!: number;
  selectedJobPost: any;
  applicationData: any;
  coverLetter: string = '';
  cvFile: File | null = null;
  candidateId!: number; 

  constructor(
    private route: ActivatedRoute,
    private jobPostService: JobPostService,  // Injection of the JobPost service
    private applicationService: ApplicationService  // Injection of the Application service
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.jobPostId = id ? +id : 1;  // If 'id' is null, set jobPostId to 0
    this.loadJobDetails();  // Load the job details
    this.loadApplicationDetails();  // Optionally load application details if necessary
  }
  

  loadJobDetails() {
    // Using the JobPost service to load the job details
    this.jobPostService.getJobPostById(this.jobPostId).subscribe(
      (data) => {
        this.selectedJobPost = data;
      },
      (error) => {
        console.error('Error loading job details:', error);
      }
    );
  }

  loadApplicationDetails() {
    // Optionally, retrieve application details if needed
    this.applicationService.getApplicationById(this.jobPostId).subscribe(
      (data) => {
        this.applicationData = data;
      },
      (error) => {
        console.error('Error loading application details:', error);
      }
    );
  }

  onSubmit() {
    if (!this.cvFile) {
      console.error('Please select a CV file to submit');
      return;
    }

    // Submit the job application using the ApplicationService
    this.applicationService.applyForJob(
      this.candidateId,
      this.jobPostId,
      this.coverLetter,
      this.cvFile
    ).subscribe(
      (response) => {
        console.log('Application submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting application:', error);
      }
    );
  }
  onFileChange(event: any) {
    // Handle file change (e.g., for uploading a CV)
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Logic for handling file upload can be added here if needed
    }
  }
}
