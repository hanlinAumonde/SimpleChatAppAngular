import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../../Services/UserService/user.service';
import { UserModel } from '../../../../Models/UserModel';
import { Page } from '../../../../Models/PageableModel';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PaginationComponent } from '../../../../CommonComponents/pagination/pagination.component';

@Component({
  selector: 'InviteUsers',
  imports: [AsyncPipe, PaginationComponent],
  templateUrl: './invite-users.component.html',
  styleUrl: './invite-users.component.css'
})
export class InviteUsersComponent implements OnInit{
  usersInvited : UserModel[] = [];
  @Output() usersInvitedChanged = new EventEmitter<UserModel[]>();

  checkboxChanged!: boolean;
  
  currentPage! : number;
  otherUsers$! : Observable<Page<UserModel>>;

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.checkboxChanged = false;
    this.currentPage = 0;
    this.otherUsers$ = this.userService.getOtherUsers(this.currentPage);
  }

  userIsInvited(userId: number):boolean {
      return this.usersInvited.some(user => user.id === userId);
  }
  
  toggleUserInvitation(event:any, user: UserModel): void {
    this.checkboxChanged = true;
    if(event.target.checked){
      this.usersInvited.push(user);
    } else {
      this.usersInvited = this.usersInvited.filter(u => u.id !== user.id);
    }
    this.usersInvitedChanged.emit(this.usersInvited);
  }

  onPageChange(curPage: number){
    this.currentPage = curPage;
    this.otherUsers$ = this.userService.getOtherUsers(this.currentPage);
  }
}
