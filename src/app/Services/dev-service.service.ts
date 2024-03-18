import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, forkJoin, map, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Dev } from "../Models/dev.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class DevService {
    constructor(private http: HttpClient) { }
    getAllDev(): Observable<any> {
        return this.http.get<any>( `${environment.apiUrl}/dev/all`, { responseType: 'json' });
      }
      getDevsByDll(dll: string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/dev/dll-id`, { params: { dll } });
      }
      getDevsById(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/dev/${id}`, { responseType: 'json' });
      }
      findDevsByMarque(marqueId: number): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/dev/by-marque/${marqueId}`);
      }
      findDevsByUser(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/dev/user/${userId}`);
      }
    
      

      findDevsByCriteria(marqueId: number, userId: number, siteId?: number, codeVeh?:number ): Observable<Dev[]> {
        // Combine multiple observables using forkJoin
        const devStreams: Observable<Dev[]>[] = [];
      
        if (marqueId) {
          devStreams.push(this.findDevsByMarque(marqueId));
          console.log("req findby marqyes");
        }
      
        if (userId) {
          devStreams.push(this.findDevsByUser(userId));
        }
      
        if (siteId) {
          devStreams.push(this.findDevsBySite(siteId));
          console.log("req findby site by dev ");

        }
      
        if (codeVeh) {
          devStreams.push(this.findDevsByVehicule(codeVeh)); // Assuming you have a findDevsByModelCode function
        }
      
       
      
        return forkJoin(devStreams).pipe(
          map((devArrays) => {
          
            const allDevs = devArrays.flat(); 
            console.log("alldevs are",allDevs);
      
           /** 
             return allDevs.filter(
              (dev) =>
                (!marqueId || dev.marqueId === marqueId) &&
                (!userId || dev.user.id === userId) &&
                (!siteId || dev.user.id === siteId) &&
                (!codeVeh || dev.devs.map.length === codeVeh)
            );*/

      return allDevs
          }),
          catchError((error) => {
            console.error('Error occurred while fetching devs by criteria:', error);
            return throwError('Error occurred while fetching devs by criteria');
          })
        );
      }


    findDevsBySite(siteId: number): Observable<any[]> {
      return this.http.get<any[]>(`${environment.apiUrl}/site/${siteId}`);
    }

    findDevsByVehicule(codeVeh: number): Observable<any[]> {
      return this.http.get<any[]>(`${environment.apiUrl}/dev/veh-model/${codeVeh}`);
    }
      
  }