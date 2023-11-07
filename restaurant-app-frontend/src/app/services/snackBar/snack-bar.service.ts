import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSuccessSnackbar(message: string, action: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: message,
        action: action,
        icon: 'done',
        snackbar: this._snackBar,
      },
      panelClass: 'success-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  openErrorSnackbar(message: string, action: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: message,
        action: action,
        icon: 'report_problem',
        snackbar: this._snackBar,
      },
      panelClass: 'error-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
