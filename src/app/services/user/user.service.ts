import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri: string = 'user';
  authUri: string = 'check-user';

  constructor(
    private apiService: ApiService,
    private userStateService: UserStateService
  ) { }

  index(): Observable<any> {
    return this.apiService.index(this.uri);
  }

  show(id: string): Observable<any> {
    return this.apiService.show(this.uri, id);
  }

  create(data: any): Observable<any> {
    return this.apiService.create(this.uri, data);
  }

  checkUserExists(username: string, email: string, auth0Id: string): Observable<any> {
    const data = { username, email, auth0Id };
    return this.apiService.create(this.authUri, data).pipe(
      tap(response => {
        this.userStateService.setUserId(response.user._id);
      })
    );
  }
}

