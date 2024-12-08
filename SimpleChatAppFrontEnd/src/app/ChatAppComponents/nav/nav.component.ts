import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserModel } from '../../Models/UserModel';
import { UserService } from '../../Services/UserService/user.service';

@Component({
  selector: 'Navigator',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @Input() userInfo!: UserModel;

  constructor(private userService: UserService){}

  onClickLogout(){
    this.userService.onLoggout().subscribe();
  }
}
