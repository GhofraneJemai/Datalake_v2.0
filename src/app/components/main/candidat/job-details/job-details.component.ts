import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPostService } from '../../../../services/job-post.service';
import { ApplicationService } from '../../../../services/application.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import necessary modules

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

  // Declare the form group
  applyForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { jobPostId: number; closeDialog?: () => void }, 
    private jobPostService: JobPostService,
    private applicationService: ApplicationService,
    private fb: FormBuilder  // Inject FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data?.jobPostId) {
      this.jobPostId = this.data.jobPostId;
      console.log('JobPost ID from dialog data:', this.jobPostId);
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.jobPostId = id ? +id : 0;
      console.log('JobPost ID from route:', this.jobPostId);
    }

    if (this.jobPostId) {
      this.loadJobDetails();
      this.loadApplicationDetails();
      this.initializeForm(); // Initialize the form once job details are loaded
    } else {
      console.error('JobPost ID is missing.');
    }
  }

  // Initialize the form with default values
  initializeForm() {
    this.applyForm = this.fb.group({
      candidateId: [null, Validators.required],
      coverLetter: ['', Validators.required],
      cvFile: [null, Validators.required]
    });
  }
  

  loadJobDetails() {
    this.jobPostService.getJobPostById(this.jobPostId).subscribe(
      (data) => {
        this.selectedJobPost = data;
        this.applyForm.patchValue({
          description: data.description,
          location: data.location,
          requirements: data.requirements,
        });
      },
      (error) => {
        console.error('Error loading job details:', error);
      }
    );
  }

  loadApplicationDetails() {
    this.applicationService.getApplicationById(this.jobPostId).subscribe(
      (data) => {
        this.applicationData = data;
      },
      (error) => {
        console.error('Error loading application details:', error);
      }
    );
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.cvFile = input.files[0];
      console.log('Selected file:', this.cvFile.name);
    } else {
      this.cvFile = null;
      console.error('No file selected');
    }
  }

  onSubmit() {
    if (!this.cvFile) {
      console.error('Please select a CV file to submit');
      return;
    }

    if (this.applyForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.applicationService.applyForJob(
      this.applyForm.value.candidateId,
      this.jobPostId,
      this.applyForm.value.coverLetter,
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

  onCancel(): void {
    if (this.data.closeDialog) {
      this.data.closeDialog();
    }
  }
}
