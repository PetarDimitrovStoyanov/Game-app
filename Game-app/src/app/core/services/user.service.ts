import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly allUrl = 'http://localhost:5000/auth/all';
  private readonly deleteUrl = 'http://localhost:5000/auth/delete/';
  private readonly editUrl = 'http://localhost:5000/auth/edit/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.allUrl);
  }

  deleteUser(id) {
    return this.http.delete(this.deleteUrl + id);
  }

  editUser(id, user): Observable<User> {
    return this.http.put<User>(this.editUrl + id, user);
  }


}
