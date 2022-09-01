import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aboutus } from '../model/Aboutus';
import { Observable } from 'rxjs';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AboutusService {

  constructor(private httpClient: HttpClient, private config: Config) { }

  getAboutus(): Observable<Aboutus> {
    return this.httpClient.get<Aboutus>(`${this.config.backendURL}/api/acercade/obtener/1`);;
  }
  addAboutus(a: Aboutus) {
    console.log(a);
    return this.httpClient.post<Aboutus>(`${this.config.backendURL}/api/acercade/agregar/`, a).subscribe(
      res => { console.log(`Se metió el objeto ${a}`) }
    );
  }
  saveAboutus(a: Aboutus) {
    console.log(a);
    return this.httpClient.put<Aboutus>(`${this.config.backendURL}/api/acercade/guardar/`, a).subscribe(
      res => { console.log(`Se metió el objeto ${a}`) }
    );
  }
}
