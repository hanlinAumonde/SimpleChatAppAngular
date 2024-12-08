import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./CommonComponents/header/header.component";
import { MainComponent } from "./ChatAppComponents/main/main.component";
import { FooterComponent } from "./CommonComponents/footer/footer.component";
import { UserModel } from './Models/UserModel';
import { Observable } from 'rxjs';
import { UserService } from './Services/UserService/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainComponent, FooterComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  userInfo$!: Observable<UserModel>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userInfo$ = this.userService.getLoggedUser();
  }
}
