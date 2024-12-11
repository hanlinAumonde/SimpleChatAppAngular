import { Component, HostBinding, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../Models/UserModel';
import { SharedUserInfoService } from '../../../Services/shared/User/shared-user-info.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import routerLinkList from '../../../routerLinkList.json';

@Component({
  selector: 'Acceuil',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css',
})
export class AcceuilComponent implements OnInit{
  userInfo$!: Observable<UserModel>;
  routerLinkList: any[] = routerLinkList;

  constructor(private sharedUserInfoService: SharedUserInfoService){}

  ngOnInit(): void {
    this.userInfo$ = this.sharedUserInfoService.currentUserInfo$;
  }
}
