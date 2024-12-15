import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../../Models/PageableModel';
import { ChatroomModel, ChatroomWithOwnerAndStatusModel, ModifyChatroomModel } from '../../Models/ChatroomModel';
import properties from '../../properties.json';
import { Observable, switchMap } from 'rxjs';
import { ModifiedChatroomModel, NewChatroomModel } from '../../Models/NewChatroomModel';
import { UserModel } from '../../Models/UserModel';

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

  addChatroom(chatroom: NewChatroomModel): Observable<boolean>{
    return this.httpClient.post<boolean>(
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

  getChatroomForModify(chatroomId: number): Observable<ModifyChatroomModel>{
    return this.httpClient.get<ModifyChatroomModel>(
      properties.ChatroomApi + chatroomId,
      {withCredentials: true}
    );
  }

  modifyChatroom(chatroomId: number, modifiedChatroom: ModifiedChatroomModel): Observable<boolean>{
    return this.httpClient.put<boolean>(
      properties.ChatroomApi + chatroomId,
      modifiedChatroom,
      {withCredentials: true}
    )
  }

  getAllUsersInChatroom(chatroomId: number): Observable<UserModel[]>{
    return this.httpClient.get<UserModel[]>(
      properties.ChatroomApi + chatroomId + '/users',
      {withCredentials: true}
    );
  }
}
