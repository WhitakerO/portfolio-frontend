import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Educacion } from '../Classes/Educacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private URL = "http://localhost:8080/api/educacion/obtener";

  constructor(private httpClient:HttpClient) { }

  getEducacion(): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(this.URL);
  }
  deleteEducacion(id:number) {
    return this.httpClient.post(`http://localhost:8080/api/educacion/eliminar/${id}`, {});
  }
  agregarEducacion(f : Educacion) {
    return this.httpClient.post<Educacion>(`http://localhost:8080/api/educacion/agregar/`, f).subscribe( 
      res=> { console.log(`Se metió el objeto ${f}`) } 
    );
  }
}
