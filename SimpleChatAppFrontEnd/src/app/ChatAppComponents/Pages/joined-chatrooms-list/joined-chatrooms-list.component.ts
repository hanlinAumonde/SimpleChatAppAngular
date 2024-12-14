import { Component } from '@angular/core';
import { UserModel } from '../../../Models/UserModel';
import { Observable } from 'rxjs';
import { SharedUserInfoService } from '../../../Services/shared/User/shared-user-info.service';
import { AsyncPipe } from '@angular/common';
import { ChatroomlistComponent } from '../../../CommonComponents/chatroomlist/chatroomlist.component';

@Component({
  selector: 'app-joined-chatrooms-list',
  imports: [AsyncPipe, ChatroomlistComponent],
  templateUrl: './joined-chatrooms-list.component.html',
  styleUrl: './joined-chatrooms-list.component.css'
})
export class JoinedChatroomsListComponent {
  userInfo$!: Observable<UserModel>;
  
  constructor(private sharedUserInfoService: SharedUserInfoService){}

  ngOnInit(): void {
    this.userInfo$ = this.sharedUserInfoService.currentUserInfo$;
  }
}
