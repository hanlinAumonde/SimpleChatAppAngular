import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../../Models/PageableModel';
import { ChatroomModel, ChatroomWithOwnerAndStatusModel } from '../../Models/ChatroomModel';
import properties from '../../properties.json';
import { Observable, switchMap } from 'rxjs';
import { NewChatroomModel } from '../../Models/NewChatroomModel';

export type ChatroomInfo = ChatroomModel | ChatroomWithOwnerAndStatusModel;

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private httpClient: HttpClient) {}

  getChatroomsByUser(userId: number, isOwnedByUser: boolean, page: number) : Observable<Page<ChatroomInfo>>{
    return this.httpClient.get<Page<ChatroomInfo>>(
      properties.getChatroomsByUserApi+userId+'/chatrooms/'+(isOwnedByUser? 'owned':'joined')+'?page='+page,
      {withCredentials: true}
    );
  }

  addChatroom(chatroom: NewChatroomModel): Observable<ChatroomModel>{
    return this.httpClient.post<ChatroomModel>(
      properties.ChatroomApi,
      chatroom,
      {withCredentials: true}
    );
  }

  deleteChatroom(chatroomId: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(
      properties.ChatroomApi + chatroomId,
      {withCredentials: true}
    );
  }

  leaveChatroom(chatroomId: number, userId: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(
      properties.ChatroomApi + chatroomId + '/users/invited/' + userId,
      {withCredentials: true}
    );
  }
  
}
