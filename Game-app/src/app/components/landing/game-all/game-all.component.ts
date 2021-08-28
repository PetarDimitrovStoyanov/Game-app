import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {GameService} from '../../../core/services/game.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-furniture-all',
  templateUrl: './game-all.component.html',
  styleUrls: ['./game-all.component.css']
})
export class GameAllComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  name: string;
  length: number;

  getAllGamesSubs: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.getAllGamesSubs = this.gameService.getAllGames().subscribe((data) => {
      this.games = data;
      this.length = this.games.length;
    });
  }

  ngOnDestroy(): void {
    this.getAllGamesSubs.unsubscribe();
  }

  searchGame() {
    if (this.name === '') {
      this.ngOnInit();
    } else {
      this.games = this.games.filter(res => {
        return res.name.toLowerCase().match(this.name.toLowerCase());
      });
    }
  }

  filter(form: NgForm) {
    if (this.length > this.games.length) {
      this.ngOnInit();
    }

    const results = form.value;
    let gameList: Game[] = [];

    if (results.adventure) {
      this.games.forEach(game => {
        if (game.category === 'Adventure games') {
          gameList.push(game);
        }
      });
    }
    if (results.role) {
      this.games.forEach(game => {
        if (game.category === 'Role-playing games') {
          gameList.push(game);
        }
      });
    }
    if (results.strategy) {
      this.games.forEach(game => {
        if (game.category === 'Strategy games') {
          gameList.push(game);
        }
      });
    }
    if (results.sport) {
      this.games.forEach(game => {
        if (game.category === 'Sports games') {
          gameList.push(game);
        }
      });
    }
    if (results.action) {
      this.games.forEach(game => {
        if (game.category === 'Action games') {
          gameList.push(game);
        }
      });
    }
    if (!results.action && !results.sport && !results.adventure && !results.strategy && !results.role) {
      this.ngOnInit();
      gameList = this.games;
    }
    this.games = gameList;
  }

  sort(form: NgForm) {
    if (form.value.sort === 'ascending') {
      this.games = this.games.sort((a, b) => a.price - b.price);
    } else if (form.value.sort === 'descending') {
      this.games = this.games.sort((a, b) => b.price - a.price);
    }
  }
}
