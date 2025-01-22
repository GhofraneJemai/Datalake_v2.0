import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../interfaces/application.model';


@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8080/api/applications'; // Change to your backend API URL

  constructor(private http: HttpClient) {}

  // Method to submit a job application
  applyForJob(
    candidateId: number,
    jobPostId: number | null,
    coverLetter: string,
    cvFile: File
  ): Observable<string> {
    const formData = new FormData();
    formData.append('candidateId', candidateId.toString());
    if (jobPostId) {
      formData.append('jobPostId', jobPostId.toString());
    }
    formData.append('coverLetter', coverLetter);
    formData.append('cvFile', cvFile, cvFile.name);

    return this.http.post<string>(`${this.apiUrl}/apply`, formData);
  }

  // Method to get all applications
  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  // Method to get an application by ID
  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  // Method to update application status
  updateApplicationStatus(
    id: number,
    status: string,
    recruitmentDate: string
  ): Observable<Application> {
    const params = new HttpParams()
      .set('status', status)
      .set('recruitmentDate', recruitmentDate);

    return this.http.put<Application>(`${this.apiUrl}/${id}/status`, null, {
      params: params,
    });
  }
}
