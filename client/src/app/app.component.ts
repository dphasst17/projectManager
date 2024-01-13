import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { Global } from './service/global.service';
import { environment } from '../environment/env';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink, RouterLinkActive,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLogin = localStorage.getItem('isLogin') === 'true'
  pathLogin = window.location.href.split('/')[3];
  constructor(private router: Router,private globalService: Global) {
  }
  ngOnInit(): void {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    }
    console.log(this.globalService.globalVar)
    console.log(environment.apiUrl)
  }

}
