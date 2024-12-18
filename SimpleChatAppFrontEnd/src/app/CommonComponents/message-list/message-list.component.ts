import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage, HistoryMessage } from '../../Models/ChatMessage';
import { ChatroomService } from '../../Services/ChatroomService/chatroom.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'MessageList',
  imports: [AsyncPipe],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit{
  @Input() chatroomId!: string | null;
  @Input() messages!: ChatMessage[];

  historyMessages$!: Observable<HistoryMessage[]>;
    
  constructor(private chatroomService: ChatroomService) {}

  ngOnInit(): void {
    this.historyMessages$ = this.chatroomService.getHistoryMessages(parseInt(this.chatroomId!));
  }

  cssClassForMessage(sender: boolean): string {
    return sender? 'sender': 'receiver';
  }
  cssClassForCard(sender: boolean): string {
    return 'card ' + (sender? 'text-bg-primary': 'text-bg-light');
  }
  cssClassForAlert(messageType: 0|1|2|3): string {
    return 'alert ' + (messageType === 1? 'alert-info': 'alert-dark');
  }
  
  spanStyle = {
    'min-width': '8px',
  }

  getTransformedMsg(msg: string): string {
    return msg.replace(/"/g, "");
  }
}
