import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proyectos } from '../model/Proyectos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private URL = "http://localhost:8080/api/proyecto/obtener";

  constructor(private httpClient:HttpClient) { }

  getProyectos(): Observable<Proyectos[]> {
    return this.httpClient.get<Proyectos[]>(this.URL);
  }
  deleteProyectos(id:number) {
    return this.httpClient.post(`http://localhost:8080/api/proyecto/eliminar/${id}`, {});
  }
  agregarProyectos(f : Proyectos) {
    return this.httpClient.post<Proyectos>(`http://localhost:8080/api/proyecto/agregar/`, f).subscribe( 
      res=> { console.log(`Se metió el objeto ${f}`) } 
    );
  }
}
