import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  exportAs: 'home'
})

export class HeaderComponent implements OnInit {
  username: string;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('name');
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
  }
}
