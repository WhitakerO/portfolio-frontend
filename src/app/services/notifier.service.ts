import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { bottom } from '@popperjs/core';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar : MatSnackBar) { }

  showNotification(text:string, button:string){
    this.snackBar.open(text, button, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
