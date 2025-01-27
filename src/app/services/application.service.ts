import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Application } from '../interfaces/application.model';


@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8090/datalake/api/applications'; // Change to your backend API URL

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
  
    return this.http.post(`${this.apiUrl}/apply`, formData, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Error in applyForJob:', error);
        return throwError(() => error);
      })
    );
  }
  getApplications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/applications`);
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
  updateApplicationStatus(id: number, status: string, recruitmentDate: string | null): Observable<Application> {
    const url = `${this.apiUrl}/${id}/status`;
  
    // Only include recruitmentDate in the params if the status is APPROVED
    const params: { status: string; recruitmentDate?: string } = {
      status: status,
    };
  
    // If status is APPROVED and recruitmentDate is provided, include it
    if (status === 'APPROVED' && recruitmentDate) {
      params.recruitmentDate = recruitmentDate;
    }
  
    return this.http.put<Application>(url, null, { params });  // Sending null body as parameters are in the query
  }
  
  updateApplicationStatus2(id: number, status: string): Observable<Application> {
    const url = `${this.apiUrl}/${id}/status`;
    const params = {
      status: status,
    };

    return this.http.put<Application>(url, null, { params });  // Sending null body as parameters are in the query
  }
  getApplicationsByCandidateId(candidateId: number): Observable<Application[]> {
    const params = new HttpParams().set('candidateId', candidateId.toString());
    return this.http.get<Application[]>(`${this.apiUrl}/by-candidate`, { params }).pipe(
      catchError((error) => {
        console.error('Error in getApplicationsByCandidateId:', error);
        return throwError(() => error);
      })
    );
  }
  getApplicationsGroupedByJobPost(): Observable<any> {
    return this.http.get(`${this.apiUrl}/grouped-by-job-post`);
  }
}
