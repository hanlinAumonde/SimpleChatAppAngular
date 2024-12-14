import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  imports: [],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})
export class ChatroomComponent {
  chatroomId!: string | null;

  constructor(private route: ActivatedRoute) {
    this.chatroomId = this.route.snapshot.paramMap.get('id');
  }
}
