import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Education } from '../model/Education';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private URL = "http://localhost:8080/api/educacion/obtener";

  constructor(private httpClient:HttpClient) { }

  getEducation(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(this.URL);
  }
  deleteEducation(id:number) {
    return this.httpClient.post(`http://localhost:8080/api/educacion/eliminar/${id}`, {});
  }
  addEducation(educationObject : Education) {
    return this.httpClient.post<Education>(`http://localhost:8080/api/educacion/agregar/`, educationObject).subscribe( 
      res=> { console.log(`Se metió el objeto ${educationObject}`) } 
    );
  }
  saveEducation(educationObject : Education) {
    return this.httpClient.put<Education>(`http://localhost:8080/api/educacion/guardar/`, educationObject).subscribe( 
      res=> { console.log(`Se metió el objeto ${educationObject}`) } 
    );
  }
}
