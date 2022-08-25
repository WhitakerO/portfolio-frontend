import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aboutus } from '../model/Aboutus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutusService {
  private URL = "https://portfolio-ow.herokuapp.com/api/acercade/obtener/1";

  constructor(private httpClient:HttpClient) { }

  getAboutus(): Observable<Aboutus> {
    return this.httpClient.get<Aboutus>(this.URL);
  }
  saveAboutus(a : Aboutus) {
    console.log(a);
    return this.httpClient.post<Aboutus>(`https://portfolio-ow.herokuapp.com/api/acercade/guardar/`, a).subscribe( 
      res=> { console.log(`Se metió el objeto ${a}`) } 
    );
  }
}
