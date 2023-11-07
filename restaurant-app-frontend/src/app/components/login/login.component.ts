import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { LoginService } from 'src/app/services/loginService/login.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

function validateEmailWithDotCom(
  control: AbstractControl
): ValidationErrors | null {
  const email = control.value;
  if (!email.endsWith('.com')) {
    return { invalidEmail: true };
  }
  return null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, validateEmailWithDotCom]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      formData.password = btoa(formData.password);
      this.loginService.login(formData).subscribe(
        (response) => {
          // Handle the response from the backend
          this.router.navigate(['/feed']);
          this.dialogRef.close();
          this.snackBar.openSuccessSnackbar(response.msg, 'Close');

          localStorage.setItem('token', response.result.token);
          this.authService.setLoggedInState(true);
        },
        (error) => {
          this.snackBar.openErrorSnackbar(error.error.message, 'Close');
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
