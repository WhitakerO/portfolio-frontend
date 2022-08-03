import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habilidades } from '../Classes/Habilidades';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  private URL = "http://localhost:8080/api/habilidad/obtener";

  constructor(private httpClient:HttpClient) { }

  getHabilidades(): Observable<Habilidades[]> {
    return this.httpClient.get<Habilidades[]>(this.URL);
  }
  deleteHabilidades(id:number) {
    return this.httpClient.post(`http://localhost:8080/api/habilidad/eliminar/${id}`, {});
  }
  agregarHabilidades(f : Habilidades) {
    return this.httpClient.post<Habilidades>(`http://localhost:8080/api/habilidad/agregar/`, f).subscribe( 
      res=> { console.log(`Se metió el objeto ${f}`) } 
    );
  }
}
