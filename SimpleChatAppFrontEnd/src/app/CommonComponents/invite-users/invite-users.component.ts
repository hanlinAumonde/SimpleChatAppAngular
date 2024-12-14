import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../Services/UserService/user.service';
import { UserModel } from '../../Models/UserModel';
import { Page } from '../../Models/PageableModel';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';

export enum operationType {
  CREATE_CHATROOM = 1,
  MODIFY_CHATROOM_INVITE = 2,
  MODIFY_CHATROOM_REMOVE = 3
}

@Component({
  selector: 'InviteUsers',
  imports: [AsyncPipe, PaginationComponent],
  templateUrl: './invite-users.component.html',
  styleUrl: './invite-users.component.css'
})
export class InviteUsersComponent implements OnInit{
  @Input() operation!: operationType;
  @Input() chatroomId : string | null = null;

  usersList : UserModel[] = [];
  @Output() usersInvitedChanged = new EventEmitter<UserModel[]>();

  checkboxChanged!: boolean;
  
  currentPage! : number;
  getUsers$! : Observable<Page<UserModel>>;

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.checkboxChanged = false;
    this.currentPage = 0;
    this.setGetUsers();
  }

  setGetUsers() {
    if(this.operation === operationType.CREATE_CHATROOM){
      this.getUsers$ = this.userService.getOtherUsers(this.currentPage);
    }else if(this.chatroomId){
      if(this.operation === operationType.MODIFY_CHATROOM_INVITE){
        this.getUsers$ = this.userService.getUsersNotInvited(parseInt(this.chatroomId),this.currentPage);
      }else{
        this.getUsers$ = this.userService.getUsersInvited(parseInt(this.chatroomId),this.currentPage);
      }
    }
  }

  userIsInvited(userId: number):boolean {
      return this.usersList.some(user => user.id === userId);
  }
  
  toggleUserInvitation(event:any, user: UserModel): void {
    this.checkboxChanged = true;
    if(event.target.checked){
      this.usersList.push(user);
    } else {
      this.usersList = this.usersList.filter(u => u.id !== user.id);
    }
    this.usersInvitedChanged.emit(this.usersList);
  }

  onPageChange(curPage: number){
    this.currentPage = curPage;
    this.setGetUsers();
  }
}
