import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Config {
    backendURL = "http://localhost:8080"
}