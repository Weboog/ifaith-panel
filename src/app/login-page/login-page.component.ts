import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ResponseLogin } from '../types/response_login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  canSubmit = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onsubmit(){
    if (this.canSubmit)
    this.canSubmit = false;
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe((response: ResponseLogin) => {
        if (response.jwt !== undefined) {
          this.canSubmit = true;
          this.auth.storeToken(response.jwt);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

}
