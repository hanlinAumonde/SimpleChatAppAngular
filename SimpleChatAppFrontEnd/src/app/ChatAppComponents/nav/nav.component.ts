import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserModel } from '../../Models/UserModel';
import { UserService } from '../../Services/UserService/user.service';
import { CheckLoginService } from '../../Services/CheckLogin/check-login.service';
import routerLinkList from '../../routerLinkList.json';
import { Observable } from 'rxjs';
import { SharedUserInfoService } from '../../Services/shared/User/shared-user-info.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'Navigator',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  userInfo$!: Observable<UserModel>;
  routerLinkList: any[];

  constructor(private userService: UserService, private checkLoginService: CheckLoginService, private sharedUserInfoService: SharedUserInfoService){
    this.routerLinkList = routerLinkList;
  }

  ngOnInit(): void {
    this.userInfo$ = this.sharedUserInfoService.currentUserInfo$;
  }

  onClickLogout(){
    this.userService.onLoggout().subscribe();
  }

  onClickLink(){
    this.checkLoginService.triggerCheckLoginEvents();
  }
}
