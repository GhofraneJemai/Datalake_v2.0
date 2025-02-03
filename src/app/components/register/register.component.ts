import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import { Role } from '../../interfaces/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  opened=false;

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]], // Password should be at least 6 characters
    confirmPassword: ['', Validators.required]
  }, {
    validators: this.passwordMatchValidator
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  // Getter methods for form fields to easily access in the template
  get firstName() {
    return this.registerForm.controls['firstName'];
  }

  get lastName() {
    return this.registerForm.controls['lastName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  // Custom validator to check if the password and confirmPassword match
  passwordMatchValidator(group: any) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Method to handle form submission
  submitDetails() {
    if (this.registerForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid. Please correct the errors.' });
      return;
    }
  
    const postData = {
      firstName: this.firstName.value!,
      lastName: this.lastName.value!,
      email: this.email.value!,
      password: this.password.value!,
      role: Role.CANDIDATE
    };
  
    this.authService.registerUser(postData).subscribe(
      (response) => {
        console.log('Success response:', response); // Log the successful response
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response });  // Should be "User registered successfully"
        window.location.href = '/login';
      },
      (error) => {
        let errorMessage = 'Une erreur inconnue est survenue. Veuillez réessayer.';
      
        if (error.status === 400) {
          errorMessage = 'Adresse e-mail déjà utilisée ou données invalides.';
        } else if (error.status === 409) {
          errorMessage = 'Cet utilisateur existe déjà.';
        } else if (error.status === 500) {
          errorMessage = 'Erreur interne du serveur. Réessayez plus tard.';
        }
      
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: errorMessage });
      }
      
    );
  }
  

}