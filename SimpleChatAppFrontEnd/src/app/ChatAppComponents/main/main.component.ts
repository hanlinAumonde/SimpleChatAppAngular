import { Component, Input } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { RouterOutlet } from '@angular/router';
import { UserModel } from '../../Models/UserModel';

@Component({
  selector: 'MainComponent',
  imports: [RouterOutlet,NavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @Input() userInfo!: UserModel;
}

