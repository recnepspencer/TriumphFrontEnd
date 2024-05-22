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
  constructor(
    private apiService: ApiService
  ) { }


  index(): Observable<any> {
    return this.apiService.index('user');
  }

  show(id: string): Observable<any> {
    return this.apiService.show('user', id);
  }
}
