import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../../../../core/core.service';
import { EmployeeService } from '../../../../../services/employee.service';
import { Employee } from '../../../../../interfaces/employee.model';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee | null,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      education: ['', [Validators.required]],
      company: ['', [Validators.required]],
      experience: [0, [Validators.required, Validators.min(0)]],
      salaryPackage: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
    }
  }
  

  onFormSubmit() {
    if (this.empForm.invalid) {
      this._coreService.openSnackBar('Please fill all the required fields', 'error');
      return;
    }
  
    const formValue = this.empForm.value;
  
    if (this.data && this.data.id) {
      this._empService.updateEmployee(this.data.id, formValue).subscribe({
        next: (updatedEmployee) => {
          this._coreService.openSnackBar('Employee updated successfully!', 'success');
          this._dialogRef.close({ action: 'update', updatedEmployee });
        },
        error: (err) => {
          this._coreService.openSnackBar('Error updating employee', 'error');
          console.error('Error during update:', err);
        },
      });
    } else {
      this._empService.addEmployee(formValue).subscribe({
        next: (newEmployee) => {
          this._coreService.openSnackBar('Employee added successfully!', 'success');
          this._dialogRef.close({ action: 'add', newEmployee });
        },
        error: (err) => {
          this._coreService.openSnackBar('Error adding employee', 'error');
          console.error('Error during addition:', err);
        },
      });
    }
  }
  
  
  
  
}
