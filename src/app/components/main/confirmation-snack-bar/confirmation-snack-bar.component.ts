// confirmation-snack-bar.component.ts
import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-snack-bar',
  template: `
     <div>
      <span>{{ data.message }}</span>
      <!-- Bouton Confirmer avec style accent -->
      <button mat-button class="mat-accent" (click)="confirm()">Confirmer</button>
      <!-- Bouton Annuler avec style warn -->
      <button mat-button class="mat-accent" (click)="cancel()">Annuler</button>
    </div>
  `,
})
export class ConfirmationSnackBarComponent {
  constructor(
    private snackBarRef: MatSnackBarRef<ConfirmationSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any // Inject the passed data (message)
  ) {}

  // Action de confirmation
  confirm() {
    this.snackBarRef.dismissWithAction();
  }

  // Action d'annulation
  cancel() {
    this.snackBarRef.dismiss();
  }
}
