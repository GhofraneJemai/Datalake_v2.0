import { Component, OnInit } from '@angular/core';
import { JobPost } from '../../../../interfaces/jobpost.model';
import { JobPostService } from '../../../../services/job-post.service';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../services/auth.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-candidate-job-posts',
  templateUrl: './candidate-job-posts.component.html',
  styleUrls: ['./candidate-job-posts.component.css']
})
export class CandidateJobPostsComponent implements OnInit {
  jobPosts: JobPost[] = [];
  selectedJobPost: JobPost | null = null;
  

  constructor(private jobPostService: JobPostService,private authService: AuthService,private _coreService: CoreService ,
    private _dialog: MatDialog ) {}

  ngOnInit(): void {
    this.fetchJobPosts();
  }

  fetchJobPosts(): void {
    this.jobPostService.getJobPostList().subscribe(
      (data: JobPost[]) => {
        this.jobPosts = data;
      },
      (error) => {
        console.error('Error fetching job posts', error);
      }
    );
  }

  applyForJob(jobId: number): void {
    // Logic to handle job application
    const jobPost = this.jobPosts.find(post => post.id === jobId);
    console.log(`Applying for job with ID: ${jobId}`);
    this._coreService.openSnackBar(`Application submitted for job : ${jobPost?.title}`, 'success');
  }
  openJobDetails(jobPostId: number) {
    // Open the JobDetailsComponent in a dialog and pass the jobPostId
    const dialogRef = this._dialog.open(JobDetailsComponent, {
      data: { jobPostId ,closeDialog: () => dialogRef.close() }  // Pass the jobPostId to the JobDetailsComponent
      
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val && val.action === 'apply') {
          this.fetchJobPosts();  // Optionally refresh the job posts list if needed
        }
      },
    });
  }
  onLogout() {
    this.authService.logout();
  }
  
}
