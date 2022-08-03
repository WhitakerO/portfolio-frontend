import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpLaboral } from '../Classes/ExpLaboral';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpLaboralService {
  private URL = "http://localhost:8080/api/explaboral/obtener";

  constructor(private httpClient:HttpClient) { }

  getExpLaboral(): Observable<ExpLaboral[]> {
    return this.httpClient.get<ExpLaboral[]>(this.URL);
  }
  deleteExpLaboral(id:number) {
    return this.httpClient.post(`http://localhost:8080/api/explaboral/eliminar/${id}`, {});
  }
  agregarExpLaboral(f : ExpLaboral) {
    return this.httpClient.post<ExpLaboral>(`http://localhost:8080/api/explaboral/agregar/`, f).subscribe( 
      res=> { console.log(`Se metió el objeto ${f}`) } 
    );
  }

}