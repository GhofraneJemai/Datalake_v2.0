import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobPostService } from '../../../../../services/job-post.service';
import { CoreService } from '../../../../../core/core.service';
import { JobPost } from '../../../../../interfaces/jobpost.model';

@Component({
  selector: 'app-job-post-add-edit',
  templateUrl: './job-post-add-edit.component.html',
  styleUrl: './job-post-add-edit.component.css'
})
export class JobPostAddEditComponent {
  jobPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jobPostService: JobPostService,
    private dialogRef: MatDialogRef<JobPostAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobPost | null,
    private _coreService: CoreService
  ) {
    this.jobPostForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      requirements: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.jobPostForm.patchValue(this.data);
    }
  }
  onFormSubmit() {
    if (this.jobPostForm.valid) {
      if (this.data) {
        // Cas : mise à jour d'une offre existante
        this.jobPostService.updateJobPost(this.data.id, this.jobPostForm.value).subscribe(() => {
          this._coreService.openSnackBar('Offre mise à jour avec succès !', 'success');
          this.dialogRef.close({ ...this.data, ...this.jobPostForm.value });
        }, () => {
          this._coreService.openSnackBar('Erreur lors de la mise à jour de l\'offre', 'error');
        });
      } else {
        // Cas : ajout d'une nouvelle offre
        this.jobPostService.addJobPost(this.jobPostForm.value).subscribe(() => {
          this._coreService.openSnackBar('Offre ajoutée avec succès !', 'success');
          this.dialogRef.close(true);
        }, () => {
          this._coreService.openSnackBar('Erreur lors de l\'ajout de l\'offre', 'error');
        });
      }
    }
  }
  
}
