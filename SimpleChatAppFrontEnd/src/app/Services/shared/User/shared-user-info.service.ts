import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserModel } from '../../../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class SharedUserInfoService {

  private user = new BehaviorSubject<UserModel>(new UserModel(0, '', '', ''));
  
  currentUserInfo$ = this.user.asObservable();

  emitUserInfo(userInfo : UserModel){
    this.user.next(userInfo);
  }
}
