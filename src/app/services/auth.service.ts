import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8090/datalake/api/auth'; // URL de l'API Spring Boot

  constructor(private http: HttpClient,private router: Router) { }

  // Méthode d'enregistrement d'un utilisateur (correspond à "/register")
  registerUser(userDetails: User): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, userDetails, {
      responseType: 'text' as 'json' // Explicitly set response type to 'text'
    });
  }
  
  

  // Méthode pour obtenir un utilisateur par email (vous pouvez ajuster cela en fonction des besoins de votre API)
  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}`);
  }

  // Méthode de connexion (correspond à "/login")
  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      responseType: 'text', // Expect plain text response
    }) as Observable<string>;
  }
  logout() {
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('candidateId'); // Remove any other session data
    this.router.navigate(['/login']); // Redirect to the login page
  }
  
}
