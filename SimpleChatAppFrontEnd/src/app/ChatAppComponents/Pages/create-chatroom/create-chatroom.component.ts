import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../Services/UserService/user.service';
import { Observable } from 'rxjs';
import { UserModel } from '../../../Models/UserModel';
import { InviteUsersComponent } from "./invite-users/invite-users.component";
import { NewChatroomModel } from '../../../Models/NewChatroomModel';
import { ValidatorsService } from '../../../Services/ValidatorService/validators.service';
import { Router } from '@angular/router';
import { ChatroomModel } from '../../../Models/ChatroomModel';
import { ChatroomService } from '../../../Services/ChatroomService/chatroom.service';

@Component({
  selector: 'CreateChatroom',
  imports: [ReactiveFormsModule, InviteUsersComponent],
  templateUrl: './create-chatroom.component.html',
  styleUrl: './create-chatroom.component.css'
})
export class CreateChatroomComponent implements OnInit{

  usersInvited: UserModel[] = [];

  createChatroomForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private validatorService: ValidatorsService, 
              private chatroomService: ChatroomService,
              private router: Router) {}

  ngOnInit(): void {
    this.createChatroomForm = this.formBuilder.group({
      titre: ['', [Validators.required, Validators.maxLength(20), this.validatorService.specialCharValidator()]],
      description: ['', [Validators.required, Validators.maxLength(100), this.validatorService.specialCharValidator()]],
      dateStart: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
      users_invited: this.formBuilder.array([],[Validators.minLength(1)])
    });
  }

  get titre(){
    return this.createChatroomForm.get('titre');
  }

  get description(){
    return this.createChatroomForm.get('description');
  }

  get usersInvitedList(){
    return this.createChatroomForm.get('users_invited') as FormArray;
  }

  get dateStart(){
    return this.createChatroomForm.get('dateStart');
  }

  get duration(){
    return this.createChatroomForm.get('duration');
  }
  
  getDateISOStr(): string {
    return new Date().toISOString().slice(0,16)
  }

  resetForm(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/planifier-a-chatroom']);
    });
  }

  updateUsersList(list: UserModel[]){
    this.usersInvited = list;
    this.usersInvitedList.clear();
    this.usersInvited.forEach(user => {
      this.usersInvitedList.push(this.formBuilder.control(user));      
    });
    console.log(this.usersInvitedList.value);
  }

  onSubmit(): void {
    const newChatroom: NewChatroomModel = {
      titre: this.createChatroomForm.value.titre,
      description: this.createChatroomForm.value.description,
      startDate: this.createChatroomForm.value.dateStart,
      duration: this.createChatroomForm.value.duration,
      usersInvited: this.createChatroomForm.value.users_invited
    };
    console.log(newChatroom);
    this.chatroomService.addChatroom(newChatroom).subscribe();
  }
}
