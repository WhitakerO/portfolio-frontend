import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevoUsuario } from '../model/NewUser';
import { LoginUsuario } from '../model/UserLogin';
import { JwtDTO } from '../model/JwtDTO';
import { Config } from '../config/config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private config:Config) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.config.backendURL + "/auth/nuevo", nuevoUsuario);
  }
  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.config.backendURL + "/auth/login", loginUsuario, httpOptions);
  }
}
