import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router,private authService: AuthService) {}

  canActivate(route: any): boolean {
    const token = localStorage.getItem('token');
    if (route.data.expectedRole === 'LOGOUT') {
      // Handle logout for unknown routes
      localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('candidateId'); 
      this.router.navigate(['index']); // Redirect to index after logout
      return false;
    } // Retrieve the token

    if (!token) {
      // If no token, redirect to login page
      this.router.navigate(['login']);
      return false;
    }

    const role = this.extractRole(token); // Extract the role from the JWT

    if (role === route.data.expectedRole) {
      return true; // Authorized access
    }

    // Redirect if the role doesn't match or is missing
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('candidateId'); 
    this.router.navigate(['forbidden']);
    return false;
  }

  private extractRole(token: string): string | null {
    try {
      // Decode the JWT payload to extract the role
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      console.log('Extracted role:', payload.role); // Log the extracted role
      return payload.role || null; // Return the role if present
    } catch (err) {
      console.error('Error decoding token:', err);
      return null; // Return null if error occurs
    }
  }
}
