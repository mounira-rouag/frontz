import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  selectedRoles: string[] = [];

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  siteid :any;
  sucessMessage='';

  constructor(
    private authService: UserServiceService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  signUp(signUpData: User) {
    signUpData.roles = this.selectedRoles;
    signUpData.siteid=this.siteid;
    this.authService.registerUser(signUpData).subscribe({
      next: (response) => {
        // Handle successful signup
        this.sucessMessage=response.message;
        this.isSuccessful=true;       // Optional: Additional actions after success (e.g., redirect to another page)
        // ...
      },
      error: (error) => {
        // Handle signup error
  
        // Extract error message (handle potential missing message)
        this.isSignUpFailed=true;
        // Extract error message (handle potential missing message)
        this.errorMessage = error.error.message;
      }
    });
  }
}
