import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserStateService } from './user/user-state.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userStateService: UserStateService,
  ) { }

  private getAccessToken(): Observable<string> {
    return from(this.authService.getAccessTokenSilently());
  }

  private createHeaders(token: string): HttpHeaders {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    let userId = localStorage.getItem('user-id');
    if (userId) {
      userId = JSON.parse(userId);
    }

    if (userId) {
      headers = headers.set('User-ID', userId);
    }

    return headers;
  }

  create<T>(uri: string, body: any): Observable<T> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = this.createHeaders(token);
        return this.http.post<T>(`${this.url}/${uri}`, body, { headers });
      })
    );
  }

  index<T>(uri: string): Observable<T> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = this.createHeaders(token);
        return this.http.get<T>(`${this.url}/${uri}`, { headers });
      })
    );
  }

  show<T>(uri: string, id: string): Observable<T> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = this.createHeaders(token);
        return this.http.get<T>(`${this.url}/${uri}/${id}`, { headers });
      })
    );
  }

  update<T>(uri: string, id: string, body: any): Observable<T> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = this.createHeaders(token);
        return this.http.put<T>(`${this.url}/${uri}/${id}`, body, { headers });
      })
    );
  }

  delete<T>(uri: string, id: string): Observable<T> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = this.createHeaders(token);
        return this.http.delete<T>(`${this.url}/${uri}/${id}`, { headers });
      })
    );
  }
}
