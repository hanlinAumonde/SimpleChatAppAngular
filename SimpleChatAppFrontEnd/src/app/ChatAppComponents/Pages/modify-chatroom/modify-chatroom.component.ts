import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-chatroom',
  imports: [],
  templateUrl: './modify-chatroom.component.html',
  styleUrl: './modify-chatroom.component.css'
})
export class ModifyChatroomComponent {
  chatroomId!: string | null;

  constructor(private route: ActivatedRoute) {
    this.chatroomId = this.route.snapshot.paramMap.get('id');
  }
}
