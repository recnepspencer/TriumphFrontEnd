import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAccessToken(): Observable<string> {
    return from(this.authService.getAccessTokenSilently());
  }

  getUser(): Observable<any> {
    return this.getAccessToken().pipe(
      mergeMap(token => {
        console.log('Token:', token); // Log the token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get('http://localhost:3000/user', { headers });
      })
    );
  }
}
