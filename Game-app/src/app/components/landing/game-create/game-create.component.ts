import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../../core/services/game.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  image = '';
  email: string;

  createGameSubs: Subscription;

  constructor(private fb: FormBuilder, private gameService: GameService, private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1950), Validators.max(2050)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required, Validators.nullValidator]],
      manufacturer: ['', [Validators.required, Validators.nullValidator,
        Validators.pattern('[\\w.\\-_0-9]{1,}[@]{1}[\\w\\-0-9]{1,}[.]{1}[\\w0-9]{1,}$')]]
    });
    this.email = localStorage.getItem('email');
  }

  createGame() {
    this.createGameSubs = this.gameService.createGame(this.form.value).subscribe((data) => {
      this.router.navigate(['/game/all']);
    });
  }

  get f() {
    return this.form.controls;
  }

  get invalid() {
    return this.form.invalid;
  }

  ngOnDestroy(): void {
    if (this.createGameSubs !== undefined) {
      this.createGameSubs.unsubscribe();
    }
  }
}
