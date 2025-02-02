import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPostService } from '../../../../services/job-post.service';
import { ApplicationService } from '../../../../services/application.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  cvFileUrl: string | null = null;
  candidateId: number | null = null;
  applicationId: number | null = null;
  application: any = { coverLetter: '', cvFile: null };

  applyForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { jobPostId: number; applicationId: number, closeDialog: () => void },
    private jobPostService: JobPostService,
    private applicationService: ApplicationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.candidateId = this.extractCandidateId(token);
    } else {
      console.error('Token not found');
    }

    this.jobPostId = this.data?.jobPostId || +this.route.snapshot.paramMap.get('id')! || 0;
    if (this.jobPostId) {
      this.loadJobDetails();
    } else {
      console.error('JobPost ID is missing.');
    }

    if (this.data.applicationId) {
      this.applicationId = this.data.applicationId;
      this.loadApplicationDetails();
    }

    this.initializeForm();
  }

  private extractCandidateId(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || null;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  initializeForm() {
    this.applyForm = this.fb.group({
      coverLetter: ['', Validators.required],
      cvFile: [null]
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
    if (!this.applicationId) return;

    this.applicationService.getApplicationById(this.applicationId).subscribe(
      (data) => {
        this.application = data;
        this.applyForm.patchValue({
          coverLetter: this.application.coverLetter,
        });

        if (this.application.cvUrl) {
          let updatedCvFile: File | null = null;
          const fileName = this.getFileNameFromUrl(this.application.cvUrl);
          updatedCvFile = this.getFileFromName(fileName);
          this.cvFileUrl = fileName;
        } else {
          console.warn('No CV file found in application data.');
        }
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
    }
  }

  onSubmit() {
    if (this.applyForm.invalid) {
      console.error('Form is invalid');
      return;
    }
  
    const updatedCoverLetter = this.applyForm.value.coverLetter;
  
    let updatedCvFile: File | null = null;
  
    if (this.cvFile) {
      updatedCvFile = this.cvFile;
    } else if (this.application.cvUrl) {
      // If there's an existing URL, simulate the file as a File object
      const fileName = this.getFileNameFromUrl(this.application.cvUrl);
      updatedCvFile = this.getFileFromName(fileName); // Convert the file name to a File object
    }
  
    console.log('Updated CV File:', updatedCvFile);
  
    if (this.candidateId !== null) {
      if (updatedCvFile) {
        // Ensure updatedCvFile is a File and not null before passing it
        if (this.applicationId) {
          // Update existing application with the CV file (either new file or existing file)
          this.applicationService.updateCandidateInfo(
            this.applicationId,
            updatedCoverLetter,
            updatedCvFile // Send the file object (never null)
          ).subscribe(
            (response) => {
              console.log('Application updated successfully:', response);
              if (this.data.closeDialog) {
                this.data.closeDialog();
              }
            },
            (error) => {
              console.error('Error updating application:', error);
            }
          );
        } else {
          // Create new application, sending selected file or existing file
          this.applicationService.applyForJob(
            this.candidateId,
            this.jobPostId,
            updatedCoverLetter,
            updatedCvFile // Send the file object (never null)
          ).subscribe(
            (response) => {
              console.log('Application submitted successfully:', response);
              if (this.data.closeDialog) {
                this.data.closeDialog();
              }
            },
            (error) => {
              console.error('Error submitting application:', error);
            }
          );
        }
      } else {
        console.error('No CV file available');
      }
    } else {
      console.error('Candidate ID is missing');
    }
  }
  
  // Method to simulate getting a File object from a file name (for illustration only)
  getFileFromName(fileName: string): File {
    const file = new File([], fileName, { type: 'application/octet-stream' });
    return file;
  }

  
  // Method to extract filename from URL (assuming the URL is a path to the file)
  getFileNameFromUrl(url: string): string {
    const normalizedUrl = url.replace(/\\/g, '/');
    const urlParts = normalizedUrl.split('_');
    return urlParts[urlParts.length - 1]; // Extract filename from URL
  }
  

  onCancel(): void {
    if (this.data.closeDialog) {
      this.data.closeDialog();
    }
  }
}
