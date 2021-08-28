import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {GameService} from '../../../core/services/game.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-games',
  templateUrl: './games-by-user.component.html',
  styleUrls: ['./games-by-user.component.css'],
})
export class GamesByUserComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  game: Game;

  getAllGamesSubs: Subscription;

  constructor(private gameService: GameService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.setAllGamesOfUser(data['id']);
    });
  }

  ngOnDestroy(): void {
    this.getAllGamesSubs.unsubscribe();
  }

  setAllGamesOfUser(userId) {
    this.getAllGamesSubs = this.gameService.getAllGames().subscribe((data) => {
      this.games = data.filter(game => game.creator === userId);
      this.game = this.games[0];
    });
  }
}
