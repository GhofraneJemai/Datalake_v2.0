import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../interfaces/application.model';
import { ApplicationService } from '../../../../services/application.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../../services/auth.service';
import { CoreService } from '../../../../core/core.service';

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
    'actions',
    
  ];
  dataSource = new MatTableDataSource<Application>(this.applications);
  selectedRowId: number | null = null; 

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe(
      (data: Application[]) => {
        this.applications = data.map(application => {
          // Construct the full URL for the CV file
          const fileName = application.cvUrl;
          application.cvUrl = `http://localhost:8090/datalake/api/applications/${fileName}`;  // Mettez à jour l'URL pour pointer vers le backend
          return application;
        });
        this.dataSource.data = this.applications;  // Mise à jour de la dataSource
        
      },
      (error) => {
        console.error('Error fetching applications', error);
      }
    );
  }
  onUpdate(application: any): void {
    console.log('Update button clicked. Checking status and recruitment date...');
    this.selectedRowId = application.id;
  
    // Vérifier le statut
    if (application.status === 'APPROVED') {
      console.log('Status is APPROVED. Checking recruitment date...');
  
      // Vérifier si la date de recrutement est valide
      if (application.recruitmentDate) {
        const selectedDate = new Date(application.recruitmentDate);
        const currentDate = new Date();
  
        // Réinitialiser l'heure pour comparer uniquement les dates
        currentDate.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
  
        if (selectedDate < currentDate) {
          console.log('Invalid recruitment date: Cannot be in the past.');
          this._coreService.openSnackBar('La date de recrutement ne peut pas être dans le passé.', 'ok');
          application.recruitmentDate = null;
          return;
        }
  
        console.log('Recruitment date is valid. Proceeding to update...');
      } else {
        console.log('Recruitment date not provided. Halting update.');
        this._coreService.openSnackBar('Veuillez sélectionner une date de recrutement.', 'ok');
        return;
      }
    } else {
      console.log('Status is not APPROVED. Clearing recruitment date...');
      application.recruitmentDate = null;
    }
  
    // Appeler la méthode pour mettre à jour l'application
    this.updateStatus(application);
    setTimeout(() => {
      this.selectedRowId = null;
    }, 500);
  }
  
  onStatusChange(application: any): void {
    console.log('Status change detected. Current status:', application.status);
  
    // Mettre à jour la ligne sélectionnée
    this.selectedRowId = application.id;
  
    if (application.status === 'APPROVED') {
      console.log('APPROVED selected. Checking recruitment date visibility...');
      application.recruitmentDate = application.recruitmentDate || null;
    } else {
      console.log('Status not APPROVED. Clearing recruitment date...');
      application.recruitmentDate = null;
    }
  }

  onDateChange(application: any): void {
    console.log('Recruitment date changed. Selected date:', application.recruitmentDate);
    if (application.status === 'APPROVED') {
      console.log('Status is APPROVED. Checking if recruitment date exists...');
      if (application.recruitmentDate) {
        const selectedDate = new Date(application.recruitmentDate);
        const currentDate = new Date();
  
        // Réinitialisation de l'heure pour comparer uniquement les dates
        currentDate.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
  
        if (selectedDate < currentDate) {
          console.log('Invalid recruitment date: Cannot be in the past.');
          this._coreService.openSnackBar('La date de recrutement ne peut pas être dans le passé.', 'ok');
          application.recruitmentDate = null;
          return;
        }
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
    let statusMessage = '';

    if (application.status === 'PENDING') {
      statusMessage = 'Statut mis à jour : En attente';
    } else if (application.status === 'REJECTED') {
      statusMessage = 'Statut mis à jour : Rejeté';
    } else if (application.status === 'APPROVED') {
      statusMessage = 'Statut mis à jour : Approuvé';
    }
    console.log('Entering updateStatus method. Application data:', application);
    if (application.status === 'APPROVED') {
      if (application.recruitmentDate) {
        const date = new Date(application.recruitmentDate);
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));
        const formattedDate = utcDate.toISOString().slice(0, 19);
         // Trims milliseconds and 'Z'
        console.log(`Updating APPROVED status with formatted date: ${formattedDate}`);
        this.applicationService
          .updateApplicationStatus(application.id, application.status, formattedDate, application.jobPost.title // Envoi du nom de l'offre
          )
          .subscribe(
            (response) => {
              console.log('Status updated successfully:', response);
              this._coreService.openSnackBar(statusMessage, 'success');
              const index = this.applications.findIndex(app => app.id === application.id);
      if (index !== -1) {
        this.applications[index] = { ...application, recruitmentDate: formattedDate };
        this.dataSource.data = [...this.applications]; // Mise à jour de la table
      }
            },
            (error) => {
              console.error('Error during status update:', error);
              this._coreService.openSnackBar('Error updating status', 'error');
            }
          );
      } else {
        console.log('Recruitment date missing for APPROVED status. Halting update.');
        alert('Please provide a recruitment date for APPROVED status.');
      }
    } else {
      
      console.log(`Updating status: ${application.status} without recruitment date.`);
      this.applicationService
        .updateApplicationStatus(application.id, application.status, '',application.jobPost.title)
        .subscribe(
          (response) => {
            console.log('Status updated successfully:', response);
            this._coreService.openSnackBar(statusMessage, 'success');
            const index = this.applications.findIndex(app => app.id === application.id);
            if (index !== -1) {
              this.applications[index] = { ...application };
              this.dataSource.data = [...this.applications]; // Mise à jour du tableau
            }
          },
          (error) => {
            console.error('Error during status update:', error);
            this._coreService.openSnackBar('Error updating status', 'error');
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
