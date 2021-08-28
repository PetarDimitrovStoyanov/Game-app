import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('registerForm') registerForm: NgForm;
  isVisible = false;
  type = 'password';

  constructor(private authService: AuthService, private router: Router) {
  }

  signUp() {
    this.authService
      .register(this.registerForm.value)
      .subscribe((data) => {
        this.router.navigate(['/auth/signin']);
      });
  }

  seePass() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.type = 'password';
    } else {
      this.type = 'text';
    }
  }

}
