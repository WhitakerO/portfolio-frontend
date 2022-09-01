import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../model/Skill';
import { Observable } from 'rxjs';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private httpClient: HttpClient, private config: Config) { }

  getSkill(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(`${this.config.backendURL}/api/habilidad/obtener`);
  }
  deleteSkill(id: number) {
    return this.httpClient.delete(`${this.config.backendURL}/api/habilidad/eliminar/${id}`, {});
  }
  addSkill(skillObject: Skill) {
    return this.httpClient.post<Skill>(`${this.config.backendURL}/api/habilidad/agregar/`, skillObject).subscribe(
      res => res
    );
  }
  saveSkill(skillObject: Skill) {
    return this.httpClient.put<Skill>(`${this.config.backendURL}/api/habilidad/guardar/`, skillObject).subscribe(
      res => res
    );
  }
}
