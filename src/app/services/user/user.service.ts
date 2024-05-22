import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri: string = 'users'
  constructor(
    private apiService: ApiService
  ) { }


  index(): Observable<any> {
    return this.apiService.index('users');
  }

  show(id: string): Observable<any> {
    return this.apiService.show('users', id);
  }
}
