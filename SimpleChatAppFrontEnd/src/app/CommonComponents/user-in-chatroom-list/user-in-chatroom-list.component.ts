import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserInChatroomModel } from '../../Models/UserModel';

@Component({
  selector: 'UserInChatroomList',
  imports: [],
  templateUrl: './user-in-chatroom-list.component.html',
  styleUrl: './user-in-chatroom-list.component.css'
})
export class UserInChatroomListComponent implements OnInit, OnChanges{
  @Input() users!: UserInChatroomModel[];

  usersOnline!: UserInChatroomModel[];
  usersOffline!: UserInChatroomModel[];

  ngOnInit(): void {
    this.updateUsersList(this.users);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['users']){
      this.updateUsersList(this.users);
    }
  }

  updateUsersList(users: UserInChatroomModel[]): void {
    if (!users) return;
    
    this.usersOnline = [...users.filter(user => user.isConnecting === 1)];
    this.usersOffline = [...users.filter(user => user.isConnecting === 0)];
  }

  ifExsitUsersOnline(): boolean {
    return this.usersOnline.length > 0;
  }
}