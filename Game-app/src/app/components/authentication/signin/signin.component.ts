import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  @ViewChild('loginForm') loginForm: NgForm;

  constructor(private authService: AuthService, private router: Router) {
  }

  signIn() {
    this.authService
      .login(this.loginForm.value)
      .subscribe((data) => {
        localStorage.setItem('token', data['token']);
        localStorage.setItem('name', data['user']['name']);
        localStorage.setItem('admin', data['user']['isAdmin']);
        this.router.navigate(['/home']);
      });
  }
}
