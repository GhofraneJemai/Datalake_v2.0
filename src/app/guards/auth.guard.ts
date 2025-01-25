import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: any): boolean {
    const token = localStorage.getItem('token'); // Retrieve the token

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
