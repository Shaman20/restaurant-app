import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { SignupService } from 'src/app/services/signupService/signup.service';
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private signupService: SignupService
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, validateEmailWithDotCom]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      formData.password = btoa(formData.password);
      this.signupService.signup(formData).subscribe(
        (response) => {
          // Handle the response from the backend
          this.dialogRef.close();
          this.snackBar.openSuccessSnackbar(response.msg, 'Close');
        },
        (error) => {
          this.snackBar.openErrorSnackbar(error.message, 'Close');
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
