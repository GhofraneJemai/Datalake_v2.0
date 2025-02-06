import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../../core/core.service';
import { JobPostService } from '../../../../../services/job-post.service';
import { JobPostAddEditComponent } from '../job-post-add-edit/job-post-add-edit.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrl: './job-post.component.css'
})
export class JobPostComponent implements OnInit {
  opened = false;
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'location',
    'requirements',
    'postedAt',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _jobPostService: JobPostService,
    private _coreService: CoreService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getJobPostList();
  }

  openAddEditJobPostForm() {
    const dialogRef = this._dialog.open(JobPostAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getJobPostList();
        }
      },
    });
  }

  getJobPostList() {
    this._jobPostService.getJobPostList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteJobPost(id: number) {
    // Ouvre le SnackBar de confirmation
    const snackBarRef = this._coreService.openConfirmationSnackBar(
      'Êtes-vous sûr de vouloir supprimer cet employé ?',
      'Confirmer',  // Texte du bouton Confirmer
      'Annuler'     // Texte du bouton Annuler
    );
  
    // Lorsque l'utilisateur confirme l'action
    snackBarRef.onAction().subscribe(() => {
      console.log('User confirmed the deletion');
  
      // Supprime l'employé après confirmation
      this._jobPostService.deleteJobPost(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Job post deleted!', 'done');
          this.getJobPostList(); // Met à jour la liste des offres d'emploi
        },
        error: console.log,
      });
    });
  
    // Lorsque l'utilisateur annule ou le SnackBar est fermé
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar dismissed, no action taken.');
      // Ajoutez une logique supplémentaire si nécessaire
    });
  }
  

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(JobPostAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getJobPostList();
        }
      },
    });
  }
  onLogout() {
    this.authService.logout();
  }
}