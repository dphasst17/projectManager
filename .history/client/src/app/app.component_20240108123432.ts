import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink, RouterLinkActive,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLogin = localStorage.getItem('isLogin') === 'true'
  pathLogin = window.location.href !== 'login';
  
  ngOnInit(): void {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    }
    console.log(this.pathLogin)
  }
  constructor(private router: Router) {
  }

}
