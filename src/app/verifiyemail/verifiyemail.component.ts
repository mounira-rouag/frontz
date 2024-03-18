import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifiyemail',
  templateUrl: './verifiyemail.component.html',
  styleUrls: ['./verifiyemail.component.css']
})
export class VerifiyemailComponent {
  errorMessage: string='';
  sucessMessage: string='';
  issuccefull:boolean=false;
  isfailed:boolean=false;

  constructor(private userService: UserServiceService, private router: Router) { }

  verifyEmail(email: string): void {
    this.userService.verifyEmail(email).subscribe(
      response => {
        if (response.status === 200) {
          // Email exists, handle success
          this.router.navigate(['/reset-password']);
          console.log('Email exists!');
          this.sucessMessage=response.message;
        this.issuccefull=true;
          
          console.error('an email was sent verify your box ');
          // Handle success logic (e.g., navigate to change password)
        } else {
          this.isfailed=true;
         
        }
      },
      error => {
        this.isfailed=true;
        this.errorMessage = error.error.message;
      },
      
    );
      
}
}
