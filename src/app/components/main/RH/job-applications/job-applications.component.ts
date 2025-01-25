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
    'status',
    'dateApplied',
    'candidate',
    'coverLetter',
    'cvUrl'
  ];
  dataSource = new MatTableDataSource<Application>(this.applications);

  constructor(private applicationService: ApplicationService,private authService: AuthService,
  ) { }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onLogout() {
    this.authService.logout();
  }
  

}
