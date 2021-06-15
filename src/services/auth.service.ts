import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { username, password })
        .pipe(map(async (user) => {
          await this.storage.set('currentUser', user);

            return user;
    }));
  }

  async logout() {
    await this.storage.remove('currentUser');
    this.router.navigate(['/home']);
  }

  getMe(id) {
      return this.http.get<any>(`${environment.apiUrl}/auth/me/${id}`);
  }

  getMyRun(id) {
    return this.http.get<any>(`${environment.apiUrl}/users/all/run/${id}`);
}

  getUsers() {
    return this.http.get<any>(`${environment.apiUrl}/users/all`);
  }

  getCommentId(id) {
    return this.http.get<any>(`${environment.apiUrl}/users/all/comments/${id}`);
  }

  getOneRun(id) {
    return this.http.get<any>(`${environment.apiUrl}/users/one/run/${id}`);
  }


  register(new_user) {
    return this.http.post<any>(`${environment.apiUrl}/users/create_user`, new_user);
  }

  updateByIf(new_user, id) {
    return this.http.put<any>(`${environment.apiUrl}/users/${id}`, new_user);
  }

  createRun(new_run) {
    return this.http.post<any>(`${environment.apiUrl}/users/run`, new_run);
  }

  createComment(new_comment) {
    return this.http.post<any>(`${environment.apiUrl}/users/comments`, new_comment);
  }

  liker(id){
    return this.http.put<any>(`${environment.apiUrl}/users/unlike/${id}`, {});
  }


  unliker(id){
    return this.http.put<any>(`${environment.apiUrl}/users/like/${id}`, {});
  }

}
