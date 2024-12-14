import { Component, OnInit } from '@angular/core';
import { ChatroomlistComponent } from "../../../CommonComponents/chatroomlist/chatroomlist.component";
import { SharedUserInfoService } from '../../../Services/shared/User/shared-user-info.service';
import { UserModel } from '../../../Models/UserModel';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-owned-chatrooms-list',
  imports: [ChatroomlistComponent, AsyncPipe],
  templateUrl: './owned-chatrooms-list.component.html',
  styleUrl: './owned-chatrooms-list.component.css'
})
export class OwnedChatroomsListComponent implements OnInit{
  userInfo$!: Observable<UserModel>;

  constructor(private sharedUserInfoService: SharedUserInfoService){}

  ngOnInit(): void {
    this.userInfo$ = this.sharedUserInfoService.currentUserInfo$;
  }
}
