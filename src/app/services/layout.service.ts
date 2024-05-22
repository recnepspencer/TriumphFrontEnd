import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private layoutSubject = new BehaviorSubject<string>('default'); // 'default', 'fullscreen', 'navigation', etc.

  layout$ = this.layoutSubject.asObservable();

  setLayout(layout: string) {
    this.layoutSubject.next(layout);
  }
}
