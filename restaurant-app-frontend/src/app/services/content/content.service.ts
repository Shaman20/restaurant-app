import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private contentSubject = new BehaviorSubject<string>('');
  content$ = this.contentSubject.asObservable();

  updateContent(content: string) {
    this.contentSubject.next(content);
  }
}
