import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ChatroomModel, ChatroomWithOwnerAndStatusModel } from '../../Models/ChatroomModel';
import { Page } from '../../Models/PageableModel';
import { ChatroomInfo, ChatroomService } from '../../Services/ChatroomService/chatroom.service';
import { AsyncPipe } from '@angular/common';
import { PaginationComponent } from "../pagination/pagination.component";
import { RouterLink } from '@angular/router';
import routerLinkList from '../../routerLinkList.json';

@Component({
  selector: 'ChatroomList',
  imports: [AsyncPipe, PaginationComponent, RouterLink],
  templateUrl: './chatroomlist.component.html',
  styleUrl: './chatroomlist.component.css'
})
export class ChatroomlistComponent implements OnInit{
  @Input() userId!: number;
  @Input() isOwner!: boolean;
  
  @Input() isOwnedRoomsPage!: boolean;
  @Input() isJoinedRoomsPage!: boolean;

  currentPage: number = 0;

  chatroomPage$!: Observable<Page<ChatroomInfo>>;

  routerLinkList: any[];

  constructor(private chatroomService: ChatroomService) {
    this.routerLinkList = routerLinkList;
  }

  ngOnInit(): void {
    this.chatroomPage$ = this.chatroomService.getChatroomsByUser(this.userId, this.isOwner, this.currentPage);
  }

  isChatroomModel(chatroom: ChatroomInfo): chatroom is ChatroomModel {
    return !('owner' in chatroom);
  }

  isChatroomWithOwnerAndStatusModel(chatroom: ChatroomInfo): chatroom is ChatroomWithOwnerAndStatusModel {
    return 'owner' in chatroom;
  }

  onPageChange(currentPage: number): void {
    this.currentPage = currentPage;
    this.chatroomPage$ = this.chatroomService.getChatroomsByUser(
      this.userId, this.isOwner, this.currentPage
    );
  }

  onDeleteChatroom(event: Event, chatroomId:number, targetPage: number){
    event.preventDefault();
    this.chatroomPage$ = this.chatroomService.deleteChatroom(chatroomId).pipe(
      switchMap(_ => this.chatroomService.getChatroomsByUser(this.userId, this.isOwner, targetPage))
    );
  }

  onLeaveChatroom(event: Event, chatroomId: number, targetPage: number){
    event.preventDefault();
    this.chatroomPage$ = this.chatroomService.leaveChatroom(chatroomId, this.userId).pipe(
      switchMap(_ => this.chatroomService.getChatroomsByUser(this.userId, this.isOwner, targetPage))
    );
  }
}
