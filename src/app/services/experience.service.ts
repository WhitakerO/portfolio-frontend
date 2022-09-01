import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../model/Experience';
import { Observable } from 'rxjs';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private httpClient: HttpClient, private config: Config) { }

  getExperience(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(`${this.config.backendURL}/api/explaboral/obtener`);
  }
  deleteExperience(id: number) {
    return this.httpClient.delete(`${this.config.backendURL}/api/explaboral/eliminar/${id}`, {});
  }
  addExperience(expObject: Experience) {
    return this.httpClient.post<Experience>(`${this.config.backendURL}/api/explaboral/agregar/`, expObject).subscribe(
      res => { console.log(`Se metió el objeto ${expObject}`) }
    );
  }
  saveExperience(expObject: Experience) {
    return this.httpClient.put<Experience>(`${this.config.backendURL}/api/explaboral/guardar/`, expObject).subscribe(
      res => { console.log(`Se metió el objeto ${expObject}`) }
    );
  }

}