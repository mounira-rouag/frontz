import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  
  token: string='';
  newPassword: string='';
  ConfirmPassword: string='';
  isSuccessful = false;
  isFailed = false;
  errorMessage:string = '';
  sucessMessage :string='';

  constructor(
    private authService: UserServiceService,
    private snackBar: MatSnackBar ,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    // Read token from URL
    this.token = this.route.snapshot.queryParams['token'];
  }


  confirmResetPassword(): void {
    console.log(this.ConfirmPassword);
    this.authService.confirmResetPassword(
      this.token, 
      this.newPassword, 
      this.ConfirmPassword,
    ).subscribe(
      response => {
        // Handle success response
        console.log(response);
        this.sucessMessage=response.message;
        this.isSuccessful=true;       
      },
      error => {
        // Handle error response
        console.error(error);
        this.isFailed=true;
        // Extract error message (handle potential missing message)
        this.errorMessage = error.error.message;
      }
    );
  }
  closeSuccessMessage() {
    this.isSuccessful = false;
    console.log("isclosed",this.isFailed);
}
 

}
