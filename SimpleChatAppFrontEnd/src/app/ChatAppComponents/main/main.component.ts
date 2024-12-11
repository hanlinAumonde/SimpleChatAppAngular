import { Component, Input, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { RouterOutlet } from '@angular/router';
import { UserModel } from '../../Models/UserModel';
import { SharedUserInfoService } from '../../Services/shared/User/shared-user-info.service';

@Component({
  selector: 'MainComponent',
  imports: [RouterOutlet,NavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  @Input() userInfo!: UserModel;

  constructor(private sharedUserInfoService: SharedUserInfoService){}

  ngOnInit(): void {
      this.sharedUserInfoService.emitUserInfo(this.userInfo);
  }
}

