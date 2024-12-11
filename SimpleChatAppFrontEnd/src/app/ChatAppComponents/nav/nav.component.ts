import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserModel } from '../../Models/UserModel';
import { UserService } from '../../Services/UserService/user.service';
import { CheckLoginService } from '../../Services/CheckLogin/check-login.service';
import routerLinkList from '../../routerLinkList.json';

@Component({
  selector: 'Navigator',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @Input() userInfo!: UserModel;
  routerLinkList: any[];

  constructor(private userService: UserService, private checkLoginService: CheckLoginService){
    this.routerLinkList = routerLinkList;
  }

  onClickLogout(){
    this.userService.onLoggout().subscribe();
  }

  onClickLink(){
    this.checkLoginService.triggerCheckLoginEvents();
  }
}
