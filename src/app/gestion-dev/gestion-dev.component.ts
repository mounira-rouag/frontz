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

    const filters = {
      marque: this.selectedMarque,
      version: this.selectedmaj,
      site: this.selectedSite,
      model: this.selectemodel,
    };
  
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

  this.authService.getUsersByProfile().subscribe(
    (data3:User[])=>{
      this.users=data3;
    },
    (error: any)=>{
      console.log("error",error);
    }
  );
  
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

  searchDevs() {
    console.log("this is dll :", this.dll);
    if (this.dll) {
    
      this.devService.getDevsByDll(this.dll)
        .subscribe(devs => this.devs = devs);
    // Handle potential errors here (optional)
    } else {
      console.log("failed" );
      // Handle empty search input (optional)
    }
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
        // Handle the fetched developers here
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
