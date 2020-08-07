import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '@app/@shared/model/User';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialogWrapperComponent } from '@app/@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';
import { AuthenticationService } from '@app/@shared/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  User: UserModel;
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this._createSignupForm();
  }
  ngOnDestroy() {}

  signup() {
    console.log(this.signupForm.valid)
    if(this.signupForm.valid)
    {
      console.log("Creating User")
      this.authService.createUser(this.signupForm.controls);
    }
  }

  get bannerId() {
    return this.signupForm.controls.bannerId;
  }
  get firstName() {
    return this.signupForm.controls.firstName;
  }
  get lastName() {
    return this.signupForm.controls.lastName;
  }
  get email() {
    return this.signupForm.controls.email;
  }
  get password() {
    return this.signupForm.controls.password;
  }
  get confirm_password() {
    return this.signupForm.controls.confirm_password;
  }
  matchPassword() {
    return (formGroup: FormGroup) => {
      let password = formGroup.controls['password'];
      let confirm_password = formGroup.controls['confirm_password'];
      if (password.value != confirm_password.value) {
        confirm_password.setErrors({ confirmedValidator: true });
      }
    };
  }
  private _createSignupForm() {
    this.signupForm = this.formBuilder.group(
      {
        bannerId: ['', [Validators.required, Validators.pattern('^(B){1}([0-9]){8}$')]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')],
        ],
        confirm_password: ['', Validators.required],
      },
      {
        validator: this.matchPassword(),
      }
    );
  }

}
