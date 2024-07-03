import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  uri = 'task';

  constructor(
    private apiService: ApiService
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

  update(id: string, data: any): Observable<any> {
    return this.apiService.update(this.uri, id, data);
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(this.uri, id);
  }
}
