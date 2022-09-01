import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Education } from '../model/Education';
import { Observable } from 'rxjs';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private httpClient: HttpClient, private config: Config) { }

  getEducation(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(`${this.config.backendURL}/api/educacion/obtener`);
  }
  deleteEducation(id: number) {
    return this.httpClient.delete(`${this.config.backendURL}/api/educacion/eliminar/${id}`, {});
  }
  addEducation(educationObject: Education) {
    return this.httpClient.post<Education>(`${this.config.backendURL}/api/educacion/agregar/`, educationObject).subscribe(
      res => res
    );
  }
  saveEducation(educationObject: Education) {
    return this.httpClient.put<Education>(`${this.config.backendURL}/api/educacion/guardar/`, educationObject).subscribe(
      res => res
    );
  }
}
