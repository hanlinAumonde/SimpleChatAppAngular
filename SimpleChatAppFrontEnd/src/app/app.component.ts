import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./CommonComponents/header/header.component";
import { MainComponent } from "./ChatAppComponents/main/main.component";
import { FooterComponent } from "./CommonComponents/footer/footer.component";
import { UserModel } from './Models/UserModel';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CheckLoginService } from './Services/CheckLogin/check-login.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainComponent, FooterComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  userInfo$!: Observable<UserModel>;

  constructor(private checkLoginService : CheckLoginService) {}

  ngOnInit(): void {
    this.userInfo$ = this.checkLoginService.checkLoginEvents$;
  }
}
