import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../../Models/UserModel';
import { ChatroomService } from '../../../Services/ChatroomService/chatroom.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import routerLinkList from '../../../routerLinkList.json';
import { InviteUsersComponent, operationType } from '../../../CommonComponents/invite-users/invite-users.component';
import { Observable, tap } from 'rxjs';
import { ModifyChatroomModel } from '../../../Models/ChatroomModel';
import { ModifiedChatroomModel } from '../../../Models/NewChatroomModel';
import { ValidatorsService } from '../../../Services/ValidatorService/validators.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-modify-chatroom',
  imports: [AsyncPipe, ReactiveFormsModule, InviteUsersComponent],
  templateUrl: './modify-chatroom.component.html',
  styleUrl: './modify-chatroom.component.css'
})
export class ModifyChatroomComponent implements OnInit {
  chatroomId!: string | null;

  usersInvited: UserModel[] = [];
  usersNotInvited: UserModel[] = [];

  getModifyChatroom$!: Observable<ModifyChatroomModel>;

  routerLinkList!: any[];
  operationInvite!: operationType;
  operationRemove!: operationType;
  modifyChatroomForm!: FormGroup;

  modifyResult$!: Observable<boolean>;
  
  constructor(private route: ActivatedRoute,
              private chatroomService: ChatroomService,
              private formBuilder: FormBuilder,
              private validatorService: ValidatorsService,
              private router: Router)
  {
    this.chatroomId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.routerLinkList = routerLinkList;
    this.operationInvite = operationType.MODIFY_CHATROOM_INVITE;
    this.operationRemove = operationType.MODIFY_CHATROOM_REMOVE;
    this.getModifyChatroom$ = this.chatroomService.getChatroomForModify(parseInt(this.chatroomId!)).pipe(
      tap(chatroom => {
        this.modifyChatroomForm = this.formBuilder.group({
          titre: [chatroom.titre,[Validators.required, Validators.maxLength(20), this.validatorService.specialCharValidator()]],
          description: [chatroom.description,[Validators.required, Validators.maxLength(100), this.validatorService.specialCharValidator()]],
          startDate: [chatroom.startDate,Validators.required],
          duration: [chatroom.duration,[Validators.required, Validators.min(1), Validators.max(30)]],
          users_invited: this.formBuilder.array([]),
          users_not_invited: this.formBuilder.array([])
        })
      })
    );
  }

  get titre(){
    return this.modifyChatroomForm.get('titre');
  }

  get description(){
    return this.modifyChatroomForm.get('description');
  }

  get startDate(){
    return this.modifyChatroomForm.get('startDate');
  }

  get duration(){
    return this.modifyChatroomForm.get('duration');
  }

  get usersInvitedList(){
    return this.modifyChatroomForm.get('users_invited') as FormArray;
  }

  get usersNotInvitedList(){
    return this.modifyChatroomForm.get('users_not_invited') as FormArray;
  }

  getDateISOStr(): string {
    return new Date().toISOString().slice(0,16)
  }

  resetForm(path:string, chatroomId?: string | null): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      chatroomId? this.router.navigate([path + chatroomId]) : this.router.navigate([path]);
    });
  }

  updateInvitedUsersList(list: UserModel[]){
    this.usersInvited = list;
    this.usersInvitedList.clear();
    this.usersInvited.forEach(user => {
      this.usersInvitedList.push(this.formBuilder.control(user));
    });
  }

  updateNotInvitedUsersList(list: UserModel[]){
    this.usersNotInvited = list;
    this.usersNotInvitedList.clear();
    this.usersNotInvited.forEach(user => {
      this.usersNotInvitedList.push(this.formBuilder.control(user));
    });
  }

  onSubmit(): void {
    const modifiedChatroom: ModifiedChatroomModel = {
      titre: this.modifyChatroomForm.value.titre,
      description: this.modifyChatroomForm.value.description,
      startDate: this.modifyChatroomForm.value.startDate,
      duration: this.modifyChatroomForm.value.duration,
      usersInvited: this.modifyChatroomForm.value.users_not_invited,
      usersRemoved: this.modifyChatroomForm.value.users_invited
    }
    console.log(modifiedChatroom);
    this.modifyResult$ = this.chatroomService.modifyChatroom(parseInt(this.chatroomId!), modifiedChatroom);
  }
}
