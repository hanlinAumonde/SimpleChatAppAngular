import { Injectable } from '@angular/core';
import properties from '../../properties.json';
import routerLinkList from '../../routerLinkList.json';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { InitialMessage } from '../../Models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocketClient!: WebSocket;
  private messageSubject = new Subject<InitialMessage>();
  public message$ = this.messageSubject.asObservable();

  constructor(private router: Router) {}

  connectToWebSocket(chatroomId: number, userId: number): void {
    this.webSocketClient = new WebSocket(properties.webSocketApi + chatroomId + "/user/" + userId);
    this.webSocketClient.onopen = (event) => console.log("WebSocket connection opened");
    this.webSocketClient.onclose = (event) => {
      console.log("WebSocket connection closed");
      this.router.navigate([routerLinkList[0].path]);
    };
    this.webSocketClient.onerror = (event) => {
      console.error("WebSocket error: ", event);
      this.router.navigate([routerLinkList[0].path]);
    }
    this.webSocketClient.onmessage = (event) => {
      this.messageSubject.next(JSON.parse(event.data));
    }
  }

  get webSocketClientState(): number {
    return this.webSocketClient.readyState;
  }

  sendMessage(message: any): void {
      this.webSocketClient.send(JSON.stringify(message));
  }

  closeWebSocket(): void {
    this.webSocketClient.close();
  }
}
