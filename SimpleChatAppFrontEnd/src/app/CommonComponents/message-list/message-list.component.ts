import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../Models/ChatMessage';

@Component({
  selector: 'MessageList',
  imports: [],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  @Input() messages!: ChatMessage[];

  cssClassForMessage(sender: 0|1): string {
    return sender === 1? 'sender': 'receiver';
  }
  cssClassForCard(sender: 0|1): string {
    return 'card ' + (sender === 1? 'text-bg-primary': 'text-bg-light');
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
