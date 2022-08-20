import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../model/Experience';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private URL = "http://localhost:8080/api/explaboral/obtener";

  constructor(private httpClient:HttpClient) { }

  getExperience(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(this.URL);
  }
  deleteExperience(id:number) {
    return this.httpClient.post(`http://localhost:8080/api/explaboral/eliminar/${id}`, {});
  }
  addExperience(expObject : Experience) {
    return this.httpClient.post<Experience>(`http://localhost:8080/api/explaboral/agregar/`, expObject).subscribe( 
      res=> { console.log(`Se metió el objeto ${expObject}`) } 
    );
  }
  saveExperience(expObject : Experience) {
    return this.httpClient.put<Experience>(`http://localhost:8080/api/explaboral/guardar/`, expObject).subscribe( 
      res=> { console.log(`Se metió el objeto ${expObject}`) } 
    );
  }

}