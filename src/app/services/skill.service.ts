import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../model/Skill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private URL = "http://localhost:8080/api/habilidad/obtener";

  constructor(private httpClient:HttpClient) { }

  getSkill(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(this.URL);
  }
  deleteSkill(id:number) {
    return this.httpClient.post(`http://localhost:8080/api/habilidad/eliminar/${id}`, {});
  }
  addSkill(skillObject : Skill) {
    return this.httpClient.post<Skill>(`http://localhost:8080/api/habilidad/agregar/`, skillObject).subscribe( 
      res=> { console.log(`Se metió el objeto ${skillObject}`) } 
    );
  }
  saveSkill(skillObject : Skill) {
    return this.httpClient.put<Skill>(`http://localhost:8080/api/habilidad/guardar/`, skillObject).subscribe( 
      res=> { console.log(`Se metió el objeto ${skillObject}`) } 
    );
  }
}
