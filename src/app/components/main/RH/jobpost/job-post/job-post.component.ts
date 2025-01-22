import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../../core/core.service';
import { JobPostService } from '../../../../../services/job-post.service';
import { JobPostAddEditComponent } from '../job-post-add-edit/job-post-add-edit.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';

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
    private _coreService: CoreService
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
    this._jobPostService.deleteJobPost(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Job post deleted!', 'done');
        this.getJobPostList();
      },
      error: console.log,
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
}