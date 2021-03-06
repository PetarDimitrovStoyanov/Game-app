import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../../core/services/game.service';
import {Game} from '../../../core/models/game';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  game: Game;
  id;
  previousGames: Game[] = [];

  getGameSubs: Subscription;

  constructor(private route: ActivatedRoute, private gameService: GameService,
              private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      // tslint:disable-next-line:no-shadowed-variable
      this.getGameSubs = this.gameService.getGame(this.id).subscribe((data: Game) => {
        this.game = data;
        this.previousGames = JSON.parse(localStorage['lookedGames']);

        this.addGameToHistory(this.game);

      });
    });
  }

  ngOnDestroy(): void {
    this.getGameSubs.unsubscribe();
  }

  isAuthAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isCreator(): boolean {
    return localStorage.getItem('email') === this.game.manufacturer;
  }

  deleteGame() {
    this.gameService.deleteGame(this.id).subscribe((data) => {
      this.router.navigate([`/game/all`]);
    });
  }

  edit() {
    this.router.navigate([`/game/edit/`, this.id]);
  }

  addGameToHistory(currentGame: Game) {
    const lookedGames = JSON.parse(localStorage['lookedGames']);
    if (!this.isGamePresented(lookedGames, currentGame)) {
      lookedGames.push(currentGame);
      localStorage['lookedGames'] = JSON.stringify(lookedGames);
    }
  }

  isGamePresented(array, game) {
    return array.some((actualGame) => actualGame.id === game.id);
  }

  async redirect(game) {
    await this.router.navigate(['/game/details', game.id]);
  }
}
