import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../../core/services/game.service';
import {Game} from '../../../core/models/game';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-game-user',
  templateUrl: './game-user.component.html',
  styleUrls: ['./game-user.component.css'],
})
export class GameUserComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  game: Game;

  getUserGamesSubs: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.getUserGamesSubs = this.gameService.getUserGames().subscribe((data) => {
      this.games = data;
      this.game = this.games[0];
    });
  }

  ngOnDestroy(): void {
    this.getUserGamesSubs.unsubscribe();
  }

  hover(game: Game) {
    this.game = game;
  }
}
