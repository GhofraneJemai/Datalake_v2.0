import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee.model';
 // Ensure this path matches your file structure

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8090/datalake/api/employes'; // Replace with your backend's URL if different

  constructor(private http: HttpClient) {}

  // Get all employees
  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // Add a new employee
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // Update an existing employee
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    console.log(`PUT request to ${this.apiUrl}/${id}`); // Debug log to check the URL
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee); // Corrected request URL
  }
  

  // Delete an employee
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
