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
    'recruitmentDate',
    
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
    console.log('Status change detected. Current status:', application.status);
    if (application.status === 'APPROVED') {
      console.log('APPROVED selected. Checking recruitment date visibility...');
      application.recruitmentDate = application.recruitmentDate || null;
    } else {
      console.log('Status not APPROVED. Clearing recruitment date...');
      application.recruitmentDate = null;
      this.updateStatus(application);
    }
  }

  onDateChange(application: any): void {
    console.log('Recruitment date changed. Selected date:', application.recruitmentDate);
    if (application.status === 'APPROVED') {
      console.log('Status is APPROVED. Checking if recruitment date exists...');
      if (application.recruitmentDate) {
        console.log('Recruitment date provided. Proceeding to update...');
        this.updateStatus(application);
      } else {
        console.log('Recruitment date not provided. Halting update.');
      }
    } else {
      console.log('Status is not APPROVED. No update needed.');
    }
  }

  updateStatus(application: Application): void {
    console.log('Entering updateStatus method. Application data:', application);
    if (application.status === 'APPROVED') {
      if (application.recruitmentDate) {
        const date = new Date(application.recruitmentDate);
        const formattedDate = date.toISOString().slice(0, 19); // Trims milliseconds and 'Z'
        console.log(`Updating APPROVED status with formatted date: ${formattedDate}`);
        this.applicationService
          .updateApplicationStatus(application.id, application.status, formattedDate)
          .subscribe(
            (response) => {
              console.log('Status updated successfully:', response);
              this.ngOnInit();
            },
            (error) => {
              console.error('Error during status update:', error);
            }
          );
      } else {
        console.log('Recruitment date missing for APPROVED status. Halting update.');
        alert('Please provide a recruitment date for APPROVED status.');
      }
    } else {
      console.log(`Updating status: ${application.status} without recruitment date.`);
      this.applicationService
        .updateApplicationStatus(application.id, application.status, '')
        .subscribe(
          (response) => {
            console.log('Status updated successfully:', response);
            this.ngOnInit();
          },
          (error) => {
            console.error('Error during status update:', error);
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
