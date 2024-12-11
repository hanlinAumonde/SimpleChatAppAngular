import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatroomModel } from '../../Models/ChatroomModel';
import { Page } from '../../Models/PageableModel';
import { ChatroomService } from '../../Services/ChatroomService/chatroom.service';
import { AsyncPipe } from '@angular/common';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'ChatroomList',
  imports: [AsyncPipe, PaginationComponent],
  templateUrl: './chatroomlist.component.html',
  styleUrl: './chatroomlist.component.css'
})
export class ChatroomlistComponent implements OnInit{
  @Input() userId!: number;
  @Input() isOwner!: boolean;

  currentPage: number = 0;

  chatroomPage$!: Observable<Page<ChatroomModel>>;

  constructor(private chatroomService: ChatroomService) {}

  ngOnInit(): void {
    this.chatroomPage$ = this.chatroomService.getChatroomsByUser(this.userId, this.isOwner, this.currentPage);
  }

  onPageChange(currentPage: number): void {
    this.currentPage = currentPage;
    this.chatroomPage$ = this.chatroomService.getChatroomsByUser(
      this.userId, this.isOwner, this.currentPage
    );
  }
}
