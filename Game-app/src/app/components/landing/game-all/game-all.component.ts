import {Component, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {GameService} from '../../../core/services/game.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-furniture-all',
  templateUrl: './game-all.component.html',
  styleUrls: ['./game-all.component.css']
})
export class GameAllComponent implements OnInit {
  game$: Observable<Array<Game>>;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.game$ = this.gameService.getAllGames();
    }, 20);
  }

}
