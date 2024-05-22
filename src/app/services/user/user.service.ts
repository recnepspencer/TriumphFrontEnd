import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.apiService.index(this.uri);
  }

  show(id: string): Observable<any> {
    return this.apiService.show(this.uri, id);
  }
}
