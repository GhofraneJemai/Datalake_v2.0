import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { EmployeeService } from '../../../../../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../../core/core.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Fixed typo (styleUrl -> styleUrls)
})
export class HomeComponent implements OnInit {
  opened = false;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val && val.action === 'add') {
          this.getEmployeeList(); // Refresh list on new employee addition
        }
      },
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
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

  deleteEmployee(id: number) {
    // Ouvre le SnackBar de confirmation avec le composant personnalisé
    const snackBarRef = this._coreService.openConfirmationSnackBar(
      'Êtes-vous sûr de vouloir supprimer cet employé ?',
      'Confirmer',  // Texte du bouton Confirmer
      'Annuler'     // Texte du bouton Annuler
    );

    // Lorsque l'utilisateur clique sur Confirmer
    snackBarRef.onAction().subscribe(() => {
      console.log('User confirmed the deletion');
      
      // Effectuez l'action de suppression
      this._empService.deleteEmployee(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Employee deleted!', 'done');
          this.getEmployeeList(); // Mettez à jour la liste des employés
        },
        error: (err) => {
          console.log('Error:', err);
          this._coreService.openSnackBar('Failed to delete employee', 'done');
        },
      });
    });

    // Quand l'utilisateur annule ou ferme le SnackBar
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar dismissed or canceled');
      // Vous pouvez ajouter une action supplémentaire si nécessaire
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val && val.action === 'update') {
          // Find the employee index and update in place
          const index = this.dataSource.data.findIndex(emp => emp.id === val.updatedEmployee.id);
          if (index !== -1) {
            this.dataSource.data[index] = val.updatedEmployee;
            this.dataSource._updateChangeSubscription(); // Notify table of changes
          }
        }
      },
    });
  }
  onLogout() {
    this.authService.logout();
  }
}
