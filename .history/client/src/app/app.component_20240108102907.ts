import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink, RouterLinkActive,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project manager';
  isLogin = localStorage.getItem('isLogin') || false
  ngOnInit(): void {
    // Chạy các hàm khi tải trang lần đầu
    this.checkLogin(this.isLogin);
  }
  checkLogin = (statusLog:any) => {
    statusLog === false ? '': ''
  }

}
