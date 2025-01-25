import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../interfaces/application.model';
import { ApplicationService } from '../../../../services/application.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {
  applications: Application[] = [];
  candidateId: number | null = null; // Default as null to check if it's set
  displayedColumns: string[] = ['jobTitle', 'description', 'location', 'status', 'dateApplied'];

  constructor(private applicationService: ApplicationService,private authService: AuthService,) { }

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
  onLogout() {
    this.authService.logout();
  }
}
