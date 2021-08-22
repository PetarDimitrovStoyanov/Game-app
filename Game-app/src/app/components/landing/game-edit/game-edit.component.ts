import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Game} from '../../../core/models/game';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../../core/services/game.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  game: Game;
  form: FormGroup;
  id;
  email: string;

  constructor(private route: ActivatedRoute, private gameService: GameService,
              private authService: AuthService, private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');

    this.route.params.subscribe(data => {
      this.id = data['id'];
      // tslint:disable-next-line:no-shadowed-variable
      this.gameService.getGame(this.id).subscribe((data: Game) => {
        this.game = data;
      });
    });

    this.form = this.fb.group({
      // Като имената в back-end-a
      name: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1950), Validators.max(2050)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required, Validators.nullValidator]],
      manufacturer: ['', [Validators.nullValidator, Validators.required,
        Validators.pattern('[\\w.\\-_0-9]{1,}[@]{1}[\\w\\-0-9]{1,}[.]{1}[\\w0-9]{1,}$')]]
    });
  }

  get f() {
    return this.form.controls;
  }

  get invalid() {
    return this.form.invalid;
  }

  editGame() {
    this.gameService.editGame(this.id, this.form.value).subscribe();
    this.router.navigate(['/game/all']);
  }
}
