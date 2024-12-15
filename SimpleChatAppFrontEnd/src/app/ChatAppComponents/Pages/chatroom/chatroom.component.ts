import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInChatroomModel, UserModel } from '../../../Models/UserModel';
import { BehaviorSubject, combineLatest, map, Observable, scan, take, withLatestFrom } from 'rxjs';
import { SharedUserInfoService } from '../../../Services/shared/User/shared-user-info.service';
import { WebSocketService } from '../../../Services/WebSocketService/web-socket.service';
import { ChatroomService } from '../../../Services/ChatroomService/chatroom.service';
import { ChatMessage } from '../../../Models/ChatMessage';
import properties from '../../../properties.json';
import routerLinkList from '../../../routerLinkList.json';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../Services/ValidatorService/validators.service';
import { AsyncPipe } from '@angular/common';
import { MessageListComponent } from '../../../CommonComponents/message-list/message-list.component';
import { UserInChatroomListComponent } from '../../../CommonComponents/user-in-chatroom-list/user-in-chatroom-list.component';

@Component({
  selector: 'app-chatroom',
  imports: [ReactiveFormsModule, AsyncPipe, MessageListComponent, UserInChatroomListComponent],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})
export class ChatroomComponent implements OnInit, OnDestroy{
  chatroomId!: string | null;
  userId$! : Observable<number>;

  usersList$ = new BehaviorSubject<UserInChatroomModel[]>([]);

  messages$! : Observable<ChatMessage[]>;

  sendMsgForm!: FormGroup;

  constructor(private route: ActivatedRoute,
              private webSocketService: WebSocketService,
              private sharedUserInfoService: SharedUserInfoService,
              private chatroomService: ChatroomService,
              private validateService: ValidatorsService,
              private router: Router
  ) {
    this.chatroomId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.userId$ = combineLatest([
      this.sharedUserInfoService.currentUserInfo$,
      this.chatroomService.getAllUsersInChatroom(parseInt(this.chatroomId!))
    ]).pipe(
      take(1),
      map(([currentUser, allUsersInChatroom]) => {
        this.webSocketService.connectToWebSocket(parseInt(this.chatroomId!), currentUser.id);
        if(allUsersInChatroom.find(user => user.id === currentUser.id)){
            //change allUsersInChatroom from UserModel[] to UserInChatroomModel[]
            allUsersInChatroom = allUsersInChatroom.map(user => {
              return {...user, isConnecting : (user.id === currentUser.id? 1 : 0)};
            });
        }else{
            alert("Vous n'êtes pas autorisé à accéder à cette Chatroom");
            this.router.navigate([routerLinkList[0].path]);
        }
        this.usersList$.next(allUsersInChatroom as UserInChatroomModel[]);
        return currentUser.id;
      })
    );

    this.messages$ = this.webSocketService.message$.pipe(
      withLatestFrom(this.usersList$, this.sharedUserInfoService.currentUserInfo$),
      map(([msg, usersList, currentUser]) => {
        let updatedUsersList = [...usersList];
        
        if(msg.messageType === 1){
          updatedUsersList = updatedUsersList.map(user => {
            if(user.id === msg.user.id){
              return {...user, isConnecting: 1};
            }
            return user;
          });
        }
        else if(msg.messageType === 2){
          updatedUsersList = updatedUsersList.map(user => {
            if(user.id === msg.user.id){
              return {...user, isConnecting: 0};
            }
            return user;
          });
        }
        else if(msg.messageType === 3){
          alert("Attention ! " + msg.message);
          this.webSocketService.closeWebSocket();
          this.router.navigate([routerLinkList[0].path]);
        }
        
        this.usersList$.next(updatedUsersList);
        
        if(msg.user.id === currentUser.id){
          return {...msg, sender: 1};
        }else{
          return {...msg, sender: 0};
        }
      }),
      scan((acc, msg) => [...acc, {...msg, index: acc.length} as ChatMessage], [] as ChatMessage[])
    );

    this.sendMsgForm = new FormGroup({
      message: new FormControl('',[Validators.required, this.validateService.specialCharValidator()])
    });
  }

  get message() { return this.sendMsgForm.get('message'); }

  sendMsg(){
    if(this.webSocketService.webSocketClientState !== WebSocket.OPEN){
      alert("Error ! La connexion WebSocket est fermée");
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([routerLinkList[5].path + this.chatroomId]);
      });
    }else{
      this.webSocketService.sendMessage(this.sendMsgForm.value.message);
      this.sendMsgForm.reset();
    }
  }

  onClickCloseChatroom(){
    //this.webSocketService.closeWebSocket();
    this.router.navigate([routerLinkList[0].path]);
  }

  ngOnDestroy(): void {
      this.webSocketService.closeWebSocket();
  }
}
