import {Component, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {GameService} from '../../../core/services/game.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-carousel-navigation',
  templateUrl: './carousel-navigation.component.html',
  styleUrls: ['./carousel-navigation.component.css']
})
export class CarouselNavigationComponent implements OnInit {
  game$: Observable<Array<Game>>;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.game$ = this.gameService.getAllGames();
  }
}
