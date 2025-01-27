import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; 

@Component({
  selector: 'app-home-page-candidate',
  templateUrl: './home-page-candidate.component.html',
  styleUrls: ['./home-page-candidate.component.css']
})
export class HomePageCandidateComponent implements OnInit {
  candidateName: string = '';  // Declare a class property to hold candidate name

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token'); // Use the correct key 'token'
  
    if (token) {
      this.candidateName = this.extractCandidateName(token) || ''; // Extract candidate name
      console.log('Candidate name extracted:', this.candidateName);
    } else {
      console.warn('No token found in localStorage');
    }
  }
  
  
  

  // Method to extract candidate name from the JWT token
  private extractCandidateName(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));  // Decode JWT payload using atob
      return payload.name || null;  // Extract name from payload, return null if not found
    } catch (err) {
      console.error('Error decoding token:', err);  // Log any decoding errors
      return null;  // Return null if there is an error
    }
  }

  // Logout method
  onLogout() {
    this.authService.logout();
  }
}
