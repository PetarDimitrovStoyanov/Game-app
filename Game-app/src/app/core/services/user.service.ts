import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly allUrl = 'http://localhost:5000/auth/all';
  private readonly deleteUrl = 'http://localhost:5000//delete/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.allUrl);
  }

  deleteGame(id) {
    return this.http.delete(this.deleteUrl + id);
  }


}
