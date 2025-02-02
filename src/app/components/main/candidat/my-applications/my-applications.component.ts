import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../interfaces/application.model';
import { ApplicationService } from '../../../../services/application.service';
import { AuthService } from '../../../../services/auth.service';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {
  applications: Application[] = [];
  candidateId: number | null = null; // Default as null to check if it's set
  displayedColumns: string[] = ['jobTitle', 'description', 'location', 'status', 'dateApplied', 'actions'];

  // Variables for the selected application
  selectedApplicationId: number | null = null;
  coverLetter: string = '';
  cvFile: File | null = null;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Retrieve candidate ID from localStorage (after login)
    this.candidateId = +localStorage.getItem('candidateId')!;

    if (this.candidateId) {
      this.applicationService.getApplicationsByCandidateId(this.candidateId).subscribe(
        (data) => {
          this.applications = data;
        },
        (error) => {
          console.error('Error fetching applications', error);
        }
      );
    } else {
      console.error('No candidate ID found in localStorage');
    }
  }
  openUpdateForm(jobPostId: number, applicationId: number) {
    // Open the JobDetailsComponent in a dialog and pass both jobPostId and applicationId
    const dialogRef = this._dialog.open(JobDetailsComponent, {
      data: { 
        jobPostId, 
        applicationId, 
        closeDialog: () => dialogRef.close() 
      }
    });
  }
  
  closeUpdateForm() {
    this.selectedApplicationId = null; // Close the update form
  }


  // Logout functionality
  onLogout() {
    this.authService.logout();
  }

  // Delete application functionality
  deleteApplication(jobId: number): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.applicationService.deleteApplication(jobId).subscribe({
        next: () => {
          alert('Application deleted successfully');
          // Optionally, refresh the job list or update UI
          this.applications = this.applications.filter(app => app.id !== jobId);
        },
        error: (err) => {
          console.error('Error deleting application:', err);
          alert('Failed to delete application');
        }
      });
    }
  }

  // Handle file input change (to capture file selection)
  onFileChange(event: any): void {
    this.cvFile = event.target.files[0];
  }

  // Method to handle the update action
  updateApplication(applicationId: number): void {
    const application = this.applications.find(app => app.id === applicationId);
  
    if (application && this.coverLetter && this.cvFile) {
      this.applicationService.updateCandidateInfo(applicationId, this.coverLetter, this.cvFile).subscribe({
        next: (updatedApplication) => {
          alert('Application updated successfully');
          // Update the application in the list with the new information
          application.coverLetter = updatedApplication.coverLetter;
          application.cvUrl = updatedApplication.cvFile;  // Adjust if the response has a new file URL
          // Reset form
          this.selectedApplicationId = null;
          this.coverLetter = '';
          this.cvFile = null;
        },
        error: (err) => {
          console.error('Error updating application:', err);
          alert('Failed to update application');
        }
      });
    } else {
      alert('Please provide all the required information');
    }
  }
  
  // Method to select an application for editing
  editApplication(applicationId: number): void {
    const applicationToEdit = this.applications.find(app => app.id === applicationId);
    if (applicationToEdit) {
      this.selectedApplicationId = applicationId;
      this.coverLetter = applicationToEdit.coverLetter || '';
      // If you need to set the cvFile, you can manage it based on the application data
    }
  }
}
