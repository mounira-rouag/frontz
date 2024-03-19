import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StorageService } from '../Services/storage.service';
import { UserServiceService } from '../Services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../Models/User.model';
import { Site } from '../Models/Sites.model';
import { Maj } from '../Models/Maj.model';
import { Marque } from '../Models/Marque.model';
import { Dev } from '../Models/dev.model';
import { PageEvent } from '@angular/material/paginator';
import { VehiculeService } from '../Services/Vehicule-service.service';
import { Vehicule } from '../Models/Vehicule.model';
import { MajService } from '../Services/Maj-service.service';
import { DevService } from '../Services/dev-service.service';
import { MarqueService } from '../Services/marques-service.service';
import { Version } from '@angular/compiler';
import { versionService } from '../Services/version-service.service';
import { SiteService } from '../Services/sites-service.service';

@Component({
  selector: 'app-gestion-dev',
  templateUrl: './gestion-dev.component.html',
  styleUrls: ['./gestion-dev.component.css']
})
export class GestionDevComponent {
  filters: any;
  showAdminBoard: any;
onMarqueChange($event: any) {
throw new Error('Method not implemented.');
}
 
  selectedMarque!: number; 
  selectedSite:any;
  selecteddeveloper:any
  selectedmaj:any
  selectedVersion: any;
  selectedDevNumber: number=1;
  selectemodel: any;
  idmaj:number =4;
  pageSize: number = 10; 
  searchcritiria:any;
  debounceTimeout:any;
  dll: string='';
  numberdev:number=0;
  id:number=0;
  marques: Marque[] = [];
  majs:Maj[]=[];
  sites:Site[]=[];
  users:User []=[];
  devs:Dev[]=[];
  Vehicules:Vehicule[]=[];
  showTable: any;
  pageEvent: PageEvent = new PageEvent;
  filteredDevs!: Dev[];
  filterId = '';
  showModeratorBoard = false;
  private roles: string[] = [];
  @ViewChild('dllInput') dllInput: any;
  
  constructor(private authService: UserServiceService,
     private storageService: StorageService, 
     private router: Router,private http:HttpClient,
     private vehiculeService: VehiculeService,
     private devService:  DevService,
     private versionService:  versionService,
     private marqueService:  MarqueService,
     private siteService:  SiteService,
     private majService: MajService) { }


  ngOnInit():void {
    const user = this.storageService.getUser();
      this.roles = user.roles;
     
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN')

  
  this.marqueService.getAllMarques().subscribe(
    (data:Marque[])=>{
      this.marques=data;
    },
    (error)=>{
      console.log("error",error);
    }
  );

  this.versionService.getAllversions().subscribe(
    (data1:Maj[])=>{
      this.majs=data1;
    },
    (error: any)=>{
      console.log("error",error);
    }
  );

  this.siteService.getAllsites().subscribe(
    (data2:Site[])=>{
      this.sites=data2;
    },
    (error: any)=>{
      console.log("error",error);
    }
  );
/** 
  this.authService.getUsersByProfile().subscribe(
    (data3:User[])=>{
      this.users=data3;
    },
    (error: any)=>{
      console.log("error",error);
    }
  );*/
  
  /*

  this.authService.getAllDev().subscribe(
    (data4:Dev[])=>{
      this.devs=data4;
    },
    (error: any)=>{
      console.log("error",error);
    }
  );*/
  
  this.majService.getDevsByVersion(this.idmaj).subscribe(
    (data4:Dev[])=>{
      this.devs=data4;
     
    },
    (error: any)=>{
      console.log("error",error);
    }
  )
  //to show all the availabel vehicules
  this.vehiculeService.getAllVehicules().subscribe(
    (data5:Vehicule[])=>{
      this.Vehicules=data5;
    },
    (error: any)=>{
      console.log("error",error);
    }
  );
  }
alldevs=this.devService.getAllDev;
filterDevs() {
  this.filteredDevs = this.devs.filter((dev) => {
    let include = true;
    for (const key in this.filters) {
      if (this.filters.hasOwnProperty(key)) {
        const filterValue = this.filters[key].toString().toLowerCase(); 
        const devValue = dev?.id?.toString().toLowerCase() || ''; 

        include = include && (devValue.includes(filterValue) || filterValue === ''); 
      }
    }
    return include;
  });
}

  searchDevs2() {
    if (this.id) {
      this.devService.getDevsById(this.id)
        .subscribe(devs => this.devs = devs);
    // Handle potential errors here (optional)
    }else{
    console.log("failed");}
    console.log(this.id);
    // Handle empty search input (optional)
  }
  

  searchDevsByFilters() {
    const marqueId=this.selectedMarque;
    const siteId=this.selectedSite;
    const userId=this.selecteddeveloper;
    const modelCode=this.selectemodel;
    console.log (marqueId);
    console.log("Selected Marque ID:", this.selectedMarque);
    console.log("Selected version ID:", this.selectedmaj);
    console.log("Selected site ID:", this.selectedSite);
    console.log("Selected vehicule ID:", this.selectemodel);
    
    
    
    this.devService.findDevsByCriteria(marqueId, siteId,userId,modelCode).subscribe(
      (data4: Dev[]) => {
       
        this.devs=data4;
       
        
      },
      (error) => {
        // Handle error
        console.error('Error fetching developers:', error);
      }
    );
    
  }
  
  toggleTable() {
    this.showTable = !this.showTable;
  }
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize
  }
 
  
}
