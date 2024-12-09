import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../../Models/PageableModel';
import { ChatroomModel } from '../../Models/ChatroomModel';
import properties from '../../properties.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private httpClient: HttpClient) {}

  getChatroomsByUser(userId: number, isOwnedByUser: boolean, page: number) : Observable<Page<ChatroomModel>>{
    return this.httpClient.get<Page<ChatroomModel>>(
      properties.getChatroomsByUserApi+userId+'/chatrooms/'+(isOwnedByUser? 'owned':'joined')+'?page='+page,
      {withCredentials: true}
    );
  }

  
}
