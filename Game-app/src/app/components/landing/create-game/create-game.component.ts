import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../../core/services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private gameService: GameService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      // Като имената в back-end-a
      name: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required, Validators.minLength(4)]],
      year: ['', [Validators.required, Validators.min(1950), Validators.max(2050)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required, Validators.nullValidator]],
      manufacturer: ['', [Validators.nullValidator]]
    });
  }

  createGame() {

      this.gameService.createGame(this.form.value).subscribe((data) => {
        this.router.navigate(['/game/all']);
      });
  }

  get f() {
    return this.form.controls;
  }

  get invalid() {
    return this.form.invalid;
  }
}
