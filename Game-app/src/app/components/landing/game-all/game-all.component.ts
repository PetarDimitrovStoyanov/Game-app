import {Component, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {GameService} from '../../../core/services/game.service';
import {Observable} from 'rxjs';
import {User} from '../../../core/models/user';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-furniture-all',
  templateUrl: './game-all.component.html',
  styleUrls: ['./game-all.component.css']
})
export class GameAllComponent implements OnInit {
  game$: Observable<Array<Game>>;
  user$: Observable<Array<User>>;
  asd: User[] = [];
  usersSearch: User[] = [];

  constructor(private gameService: GameService, private userService: UserService) {
  }

  ngOnInit() {
    this.user$ = this.userService.getAll();
    this.userService.getAll().subscribe(data => {
      data.forEach(a => {
        this.asd.push(a);
      });
    });

    setTimeout(() => {
      this.game$ = this.gameService.getAllGames();
    }, 20);
  }

  searchRecipe(value: string) {
    this.usersSearch = [];
    for (const user of this.asd) {
      if (user.name.toLowerCase().trim().includes(value.toLowerCase().trim())) {
        this.usersSearch.push(user);
      }
    }
  }
}
