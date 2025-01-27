import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../interfaces/application.model';
import { ApplicationService } from '../../../../services/application.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {
  applications: Application[] = [];
  displayedColumns: string[] = [
    'id',
    'jobTitle',
    'description',
    'location',
    'dateApplied',
    'candidate',
    'coverLetter',
    'cvUrl',
    'status',
  ];
  dataSource = new MatTableDataSource<Application>(this.applications);

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe(
      (data: Application[]) => {
        this.applications = data;
        this.dataSource.data = this.applications;  // Update the dataSource
      },
      (error) => {
        console.error('Error fetching applications', error);
      }
    );
  }
  onStatusChange(application: any): void {
    if (application.status === 'APPROVED') {
      // Optionally set the recruitment date to a default value when approved
      if (!application.recruitmentDate) {
        application.recruitmentDate = new Date();
      }
    } else {
      // Reset recruitment date if status isn't APPROVED
      this.updateStatus(application); 
      application.recruitmentDate = null;
    }
  }
  
  
  onDateChange(application: any): void {
    // When the recruitment date is changed, check if it's set and the status is APPROVED
    if (application.status === 'APPROVED' && application.recruitmentDate) {
      this.updateStatus(application); // Call updateStatus only after the date is set
    }
  }

  updateStatus(application: Application): void {
    // Only proceed with updating if the status is APPROVED and a recruitment date is selected
    if (application.status === 'APPROVED') {
      // Check if the recruitment date is provided
      if (application.recruitmentDate) {
        const formattedDate = new Date(application.recruitmentDate).toISOString(); // Ensure correct format
  
        this.applicationService.updateApplicationStatus(application.id, application.status, formattedDate).subscribe(
          (response) => {
            console.log('Status updated successfully!', response);
            // Optionally, refresh the applications list after update
            this.ngOnInit();
          },
          (error) => {
            console.error('Error updating status', error);
          }
        );
      } else {
        // If recruitment date is not provided, show an error
        console.error('Recruitment date is required for approved status.');
        alert('Please provide a recruitment date for APPROVED status.');
      }
    } else {
      // If the status is not APPROVED, update the status without the recruitment date
      this.applicationService.updateApplicationStatus(application.id, application.status, "").subscribe(
        (response) => {
          console.log('Status updated successfully!', response);
          this.ngOnInit(); // Refresh the applications list
        },
        (error) => {
          console.error('Error updating status', error);
        }
      );
    }
  }
  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onLogout() {
    this.authService.logout();
  }
}
