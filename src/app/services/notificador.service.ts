import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { bottom } from '@popperjs/core';

@Injectable({
  providedIn: 'root'
})
export class NotificadorService {

  constructor(private snackBar : MatSnackBar) { }

  mostrarNotificacion(detalle:string, boton:string){
    this.snackBar.open(detalle, boton, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
