import {Component, OnInit} from '@angular/core';
import {GameService} from '../../../core/services/game.service';
import {Observable} from 'rxjs';
import {Game} from '../../../core/models/game';

@Component({
  selector: 'app-furniture-user',
  templateUrl: './game-user.component.html',
  styleUrls: ['./game-user.component.css']
})
export class GameUserComponent implements OnInit {
  userGames$: Observable<Array<Game>>;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.userGames$ = this.gameService.getUserGames();
  }

  deleteFurniture(id: string) {
    this.gameService.deleteGame(id).subscribe((data) => {
      this.userGames$ = this.gameService.getUserGames();
    });
  }
}
