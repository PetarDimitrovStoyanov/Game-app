import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class Header implements OnInit {
  username;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('name');
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
    this.router.navigate(['/auth/signin']);
  }
}
