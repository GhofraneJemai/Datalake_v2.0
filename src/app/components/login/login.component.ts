import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
//adminrh
  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid form data',
      });
      return;
    }
  
    const loginData = {
      email: this.email.value!,
      password: this.password.value!,
    };
  
    this.authService.login(loginData).subscribe(
      (response) => {
        try {
          const token = response; // Assuming the token is returned directly as the response body
          const candidateId = this.extractCandidateId(token); // Get the userId, which is the candidateId
  
          if (!candidateId) {
            throw new Error('Candidate ID (userId) not found in token');
          }
  
          localStorage.setItem('token', token); // Save token
          localStorage.setItem('candidateId', candidateId.toString()); // Save candidate ID
          const role = this.extractRole(token);

          if (role === 'CANDIDATE') {
            window.location.href = '/candidat-applications';
        } else if (role === 'ADMIN') {
            window.location.href = '/job-applications';
        }
         else {
            throw new Error('Role not recognized');
          }
          
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful',
          });
  
  
        } catch (err) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid login response structure',
          });
          console.error(err);
        }
      },
      (error) => {
        const errorMessage =
          error?.error?.message || error?.message || 'Login failed';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      }
    );
  }
  
  private extractCandidateId(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.userId || null; // Extract userId, which is the candidateId
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }

  }
  private extractRole(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.role || null; // Extract role
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }
  
  
}