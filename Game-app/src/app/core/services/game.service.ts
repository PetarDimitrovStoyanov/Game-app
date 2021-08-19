import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../models/game';
import {Observable} from 'rxjs';

const createF = `http://localhost:5000/game/create`;
const getAllF = `http://localhost:5000/game/all`;
const singleF = `http://localhost:5000/game/`;
const getUserF = `http://localhost:5000/game/user`;
const deleteGame = `http://localhost:5000/game/delete/`;
const editGame = `http://localhost:5000/game/edit/`;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  createGame(data) {
    return this.http.post(createF, data);
  }

  getAllGames(): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(getAllF);
  }

  getGame(id): Observable<Game> {
    return this.http.get<Game>(singleF + id);
  }

  getUserGames(): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(getUserF);
  }

  deleteGame(id) {
    return this.http.delete(deleteGame + id);
  }

  editGame(id, game): Observable<Game> {
    console.log(game);
    return this.http.put<Game>(editGame + id, game);
  }
}
