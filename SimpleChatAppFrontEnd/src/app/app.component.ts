import { Component } from '@angular/core';
import { HeaderComponent } from "./CommonComponents/header/header.component";
import { MainComponent } from "./ChatAppComponents/main/main.component";
import { FooterComponent } from "./CommonComponents/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
