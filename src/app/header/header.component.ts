import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


  private roles: string[] = [];
  
 
  showModeratorBoard = false;
  username?: string;
  

 
  isLoggedIn= this.tokenStorageService.isLoggedIn() ;
  
 
  showAdminBoard = this.roles.includes('ROLE_ADMIN')
  
  constructor( private userService: UserServiceService,private tokenStorageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorageService.isLoggedIn();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_RC');

      this.username = user.username;
     
    }
    console.log(this.isLoggedIn);
  }

  
 
  signOut(): void {
    // Call your service method for logout
    
        window.sessionStorage.clear();
        window.location.href = '/firstview';
  }
}
