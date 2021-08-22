import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../../core/services/game.service';
import {Game} from '../../../core/models/game';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: Game;
  id;

  constructor(private route: ActivatedRoute, private gameService: GameService,
              private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      // tslint:disable-next-line:no-shadowed-variable
      this.gameService.getGame(this.id).subscribe((data: Game) => {
        this.game = data;
      });
    });
  }

  isAuthAdmin(): boolean {
    return this.authService.isAdmin();
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(this.id).subscribe((data) => {
      this.router.navigate([`/home`]);
    });
  }

  edit() {
    this.router.navigate([`/game/edit/`, this.id]);
  }
}
