import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {GameService} from '../../../core/services/game.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-carousel-navigation',
  templateUrl: './carousel-navigation.component.html',
  styleUrls: ['./carousel-navigation.component.css']
})
export class CarouselNavigationComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  getAllGamesSubs: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.getAllGamesSubs = this.gameService.getAllGames().subscribe((data) => {
      this.games = data.splice(0, 3);
    });
  }

  ngOnDestroy(): void {
    this.getAllGamesSubs.unsubscribe();
  }
}
