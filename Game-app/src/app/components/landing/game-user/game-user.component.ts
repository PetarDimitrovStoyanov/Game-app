import {Component, OnInit} from '@angular/core';
import {GameService} from '../../../core/services/game.service';
import {Game} from '../../../core/models/game';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-game-user',
  templateUrl: './game-user.component.html',
  styleUrls: ['./game-user.component.css'],
  animations: [
    /*start*/
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75px)', offset: 0}),
            style({opacity: 0.5, transform: 'translateY(35px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0px)', offset: 1})
          ]))
        ]), {optional: true}),
      ])
    ]),
    /*start*/
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0, opacity: 0, transform: 'scale(0.85)',
          'margin-bottom': 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0
        }),
        /*Animate the scaling*/
        animate('100ms', style({
          height: '*',
          'margin-bottom': '*', paddingTop: '*', paddingBottom: '*', paddingLeft: '*', paddingRight: '*'
        })),
        animate(1500)
      ]),
    ])
  ]
})
export class GameUserComponent implements OnInit {
  games: Game[] = [];
  game: Game;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.getUserGames().subscribe((data) => {
      this.games = data;
      this.game = this.games[0];
    });
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id).subscribe((data) => {
      this.ngOnInit();
    });
  }

  hover(game: Game) {
    this.game = game;
  }
}
