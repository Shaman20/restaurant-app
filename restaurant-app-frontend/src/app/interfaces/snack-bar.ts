import { MatSnackBar } from '@angular/material/snack-bar';

export interface SnackBar {
  message: string;
  action: string;
  icon: string;
  snackbar: MatSnackBar;
}
