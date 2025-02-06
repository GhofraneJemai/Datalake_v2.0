import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../interfaces/application.model';
import { ApplicationService } from '../../../../services/application.service';
import { AuthService } from '../../../../services/auth.service';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../../../../core/core.service';

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
    private _dialog: MatDialog,
    private _coreService: CoreService
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

    const snackBarRef = this._coreService.openConfirmationSnackBar(
      'Êtes-vous sûr de vouloir supprimer cette candidature ?',
      'Confirmer',  // Texte du bouton Confirmer
      'Annuler'     // Texte du bouton Annuler
    );
  
    // Lorsque l'utilisateur confirme l'action
    snackBarRef.onAction().subscribe(() => {
      console.log('User confirmed the deletion');
      this.applicationService.deleteApplication(jobId).subscribe({
        next: () => {
          this._coreService.openSnackBar('Application deleted successfully', 'success');
          // Optionally, refresh the job list or update UI
          this.applications = this.applications.filter(app => app.id !== jobId);
        },
        error: (err) => {
          console.error('Error deleting application:', err);
          this._coreService.openSnackBar('Failed to delete application', 'error');
        }
      });
    });

    // Lorsque l'utilisateur annule ou le SnackBar est fermé
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar dismissed, no action taken.');
      // Ajoutez une logique supplémentaire si nécessaire
    });
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
          this._coreService.openSnackBar('Application updated successfully', 'success');
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
          this._coreService.openSnackBar('Failed to update application', 'error');
        }
      });
    } else {
      this._coreService.openSnackBar('Please provide all the required information', 'error');
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
