import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewChecked, WritableSignal, signal, OnChanges, SimpleChanges } from '@angular/core';
import { ChatMessage, HistoryMessage } from '../../Models/ChatMessage';
import { ChatroomService, ScrollBehavior } from '../../Services/ChatroomService/chatroom.service';
import { BehaviorSubject, map, Observable, withLatestFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'MessageList',
  imports: [AsyncPipe],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit, AfterViewChecked, OnChanges {
  @Input() chatroomId!: string | null;
  @Input() messages!: ChatMessage[];

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  historyMessages$ = new BehaviorSubject<HistoryMessage[]>([]);
  histMsgPage: WritableSignal<number> = signal(0);
  haveMoreHistMsgs : WritableSignal<boolean> = signal(true);

  scrollBehavior!: ScrollBehavior;
  lastScrollDiff = 0;
  private firstVisibleMessageInfo: {index: number, timestamp: string, message: string} | null = null;
    
  constructor(private chatroomService: ChatroomService) {}

  ngOnInit(): void {
    this.scrollBehavior = ScrollBehavior.None;
    this.chatroomService.getHistoryMessagesByPage(parseInt(this.chatroomId!), this.histMsgPage()).subscribe(
      (historyMessages: HistoryMessage[]) => {
        if(historyMessages.length === 0) this.haveMoreHistMsgs.update(_ => false);
        this.historyMessages$.next(historyMessages);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['messages']){
        this.scrollBehavior = ScrollBehavior.ScrollToBottom;
      }
  }

  showMoreHistMsg(event: Event): void {
    event.preventDefault();
    this.scrollBehavior = ScrollBehavior.Preserve;
    
    // 记住当前第一条内容消息（第二项）的信息
    const currentFirstMessage = this.historyMessages$.value[0];
    
    this.histMsgPage.update(page => page + 1);
    this.chatroomService.getHistoryMessagesByPage(parseInt(this.chatroomId!), this.histMsgPage()).pipe(
      withLatestFrom(this.historyMessages$),
      map(([newHistMsg, oldHistMsg]) => {
        if(newHistMsg.length === 0) {
          this.histMsgPage.update(page => page - 1);
          this.haveMoreHistMsgs.update(_ => false);
        } else {
          const latestNewMsg = newHistMsg[newHistMsg.length - 1];
          let combinedMessages = newHistMsg.concat(oldHistMsg.map(
            (msg, idx) => ({
              ...msg,
              index: idx + newHistMsg.length,
              messageType: msg.messageType === "dateSign" && msg.timestamp === latestNewMsg.timestamp? 
                                "latestDateSign" : msg.messageType
            }
          ))) as HistoryMessage[];
          this.historyMessages$.next(combinedMessages);

          // 在更新后找到之前的第一条消息并滚动到它的位置
          if (currentFirstMessage) {
            requestAnimationFrame(() => {
              const targetIndex = currentFirstMessage.timestamp === latestNewMsg.timestamp? newHistMsg.length : newHistMsg.length; // 新消息数量 + 1（跳过日期标签）
              const targetElement = this.messageContainer.nativeElement.children[targetIndex];
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'auto' });
              }
            });
          }
        }
      })
    ).subscribe();
  }

  ngAfterViewChecked() {
    if (this.scrollBehavior === ScrollBehavior.ScrollToBottom) {
      this.scrollToBottom();
    }
    this.scrollBehavior = ScrollBehavior.None;
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTo({
        top: this.messageContainer.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch(err) {
      console.log('Error scrolling to bottom:', err);
    }
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
