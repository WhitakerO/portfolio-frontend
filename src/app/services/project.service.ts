import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/Project';
import { Observable } from 'rxjs';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient:HttpClient, private config:Config) { }

  getProject(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.config.backendURL}/api/proyecto/obtener`);
  }
  deleteProject(id:number) {
    return this.httpClient.delete(`${this.config.backendURL}/api/proyecto/eliminar/${id}`, {});
  }
  addProject(projectObject : Project) {
    return this.httpClient.post<Project>(`${this.config.backendURL}/api/proyecto/agregar/`, projectObject).subscribe( 
      res=> { console.log(`Se metió el objeto ${projectObject}`) } 
    );
  }
  saveProject(projectObject : Project) {
    return this.httpClient.put<Project>(`${this.config.backendURL}/api/proyecto/guardar/`, projectObject).subscribe( 
      res=> { console.log(`Se metió el objeto ${projectObject}`) } 
    );
  }
}
