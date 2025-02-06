import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationSnackBarComponent } from '../components/main/confirmation-snack-bar/confirmation-snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
    });
  }
  openConfirmationSnackBar(message: string, confirmAction: string, cancelAction: string) {
    const snackBarRef = this._snackBar.openFromComponent(ConfirmationSnackBarComponent, {
      data: { message }, // Passez le message dans le data
      duration: 5000,
      verticalPosition: 'top',
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('User confirmed the action');
    });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar dismissed');
    });

    return snackBarRef; // Retourner snackBarRef pour un usage ultérieur
  }
}