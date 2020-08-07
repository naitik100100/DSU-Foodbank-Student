import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/@shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  constructor(
    public authenticationService: AuthenticationService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setUpForm()
  }

  onSubmit()
  {
    if(this.loginForm.valid)
    {
      this.authenticationService.authenticateUser(this.loginForm.controls['bannerId'].value,this.loginForm.controls['password'].value)
    }
  }

  get bannerId() {
    return this.loginForm.controls.bannerId;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  setUpForm()
  {
    this.loginForm = this.formBuilder.group({
      bannerId: ['', [Validators.required, Validators.maxLength(9)]],
      password: ['', Validators.required],
    });
  }

}
