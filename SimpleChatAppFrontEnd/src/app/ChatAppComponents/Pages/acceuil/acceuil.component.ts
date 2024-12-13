import { Component, HostBinding, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { UserModel } from '../../../Models/UserModel';
import { SharedUserInfoService } from '../../../Services/shared/User/shared-user-info.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import routerLinkList from '../../../routerLinkList.json';
import { ChatroomService } from '../../../Services/ChatroomService/chatroom.service';
import { ChatroomlistComponent } from "../../../CommonComponents/chatroomlist/chatroomlist.component";

@Component({
  selector: 'Acceuil',
  imports: [AsyncPipe, RouterLink, ChatroomlistComponent],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css',
})
export class AcceuilComponent implements OnInit{
  routerLinkList: any[] = routerLinkList;

  userInfo$!: Observable<UserModel>;

  constructor(private sharedUserInfoService: SharedUserInfoService){}

  ngOnInit(): void {
    this.userInfo$ = this.sharedUserInfoService.currentUserInfo$;
  }
}
