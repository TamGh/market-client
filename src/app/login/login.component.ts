import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public authService: AuthService)
    { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(){
    this.form = this.formBuilder.group(
      {
        username: ['testUser@yopmail.com'],
        password: ['test!12345']
      }
    );
  }

  login() {
    this.authService.login(this.form.get('username').value, this.form.get('password').value)
      .subscribe(res => {
        localStorage.setItem('access_token', res.data);
        localStorage.setItem('userName', this.form.get('username').value);

        this.authService.TokenSubject.next('Bearer ' + res.data);
      })
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userName') != null;
  }

  logout() {
    this.authService.logout();
    if(this.router.url === '/create') {
      this.router.navigate(['']);
    }
  }
}
