import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aboutus } from '../Classes/Aboutus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutusService {
  private URL = "http://localhost:8080/api/acercade/obtener/1";

  constructor(private httpClient:HttpClient) { }

  getAboutus(): Observable<Aboutus> {
    return this.httpClient.get<Aboutus>(this.URL);
  }
  saveAboutus(a : Aboutus) {
    console.log(a);
    return this.httpClient.post<Aboutus>(`http://localhost:8080/api/acercade/guardar/`, a).subscribe( 
      res=> { console.log(`Se metió el objeto ${a}`) } 
    );
  }
}
