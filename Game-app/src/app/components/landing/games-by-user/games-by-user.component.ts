import {Component, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {GameService} from '../../../core/services/game.service';
import {ActivatedRoute} from '@angular/router';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user-games',
  templateUrl: './games-by-user.component.html',
  styleUrls: ['./games-by-user.component.css'],
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
export class GamesByUserComponent implements OnInit {
  games: Game[] = [];
  game: Game;

  constructor(private gameService: GameService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.setAllGamesOfUser(data['id']);
    });
  }

  hover(game: Game) {
    this.game = game;
  }

  setAllGamesOfUser(userId) {
    this.gameService.getAllGames().subscribe((data) => {
      this.games = data.filter(game => game.creator === userId);
      this.game = this.games[0];
    });
  }

}
