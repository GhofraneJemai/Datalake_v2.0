import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobPost } from '../interfaces/jobpost.model';

@Injectable({
  providedIn: 'root',
})
export class JobPostService {
  private apiUrl = 'http://localhost:8090/datalake/api/jobposts'; // Replace with your backend endpoint

  constructor(private http: HttpClient) {}

  // Get all job posts
  getJobPostList(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(this.apiUrl);
  }
  getJobPostById(jobPostId: number): Observable<JobPost> {
    return this.http.get<JobPost>(`${this.apiUrl}/${jobPostId}`);
  }

  // Add a new job post
  addJobPost(data: JobPost): Observable<JobPost> {
    return this.http.post<JobPost>(`${this.apiUrl}/create`, data);
  }

    // Update an existing job post
    updateJobPost(id: number, data: JobPost): Observable<JobPost> {
      return this.http.put<JobPost>(`${this.apiUrl}/${id}`, data); // Corrected to use PUT
    }
  
    // Delete a job post
    deleteJobPost(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
