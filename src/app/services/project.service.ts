import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/Project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private URL = "http://localhost:8080/api/proyecto/obtener";

  constructor(private httpClient:HttpClient) { }

  getProject(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.URL);
  }
  deleteProject(id:number) {
    return this.httpClient.post(`http://localhost:8080/api/proyecto/eliminar/${id}`, {});
  }
  addProject(f : Project) {
    return this.httpClient.post<Project>(`http://localhost:8080/api/proyecto/agregar/`, f).subscribe( 
      res=> { console.log(`Se metió el objeto ${f}`) } 
    );
  }
}
