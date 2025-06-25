import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'final_eCommerce';
  // constructor(private primeng: PrimeNG){}

  // ngOnInit() {
  //   this.primeng.ripple.set(true);
  // }
}
