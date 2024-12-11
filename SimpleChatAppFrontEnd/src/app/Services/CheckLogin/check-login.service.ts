import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, Subject, switchMap } from 'rxjs';
import { UserService } from '../UserService/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginService {
  private checkLoginEvents = new BehaviorSubject<void>(undefined);

  checkLoginEvents$ = this.checkLoginEvents.asObservable()
    .pipe(
      debounceTime(300),
      switchMap(() => this.userService.getLoggedUser())
    );

  constructor(private userService: UserService) {}

  triggerCheckLoginEvents(){
    this.checkLoginEvents.next();
  }
}
