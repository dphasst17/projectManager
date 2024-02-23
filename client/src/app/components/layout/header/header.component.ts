import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../../../service/global.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit  {
  isLogin = this.global.getValueLocal('isLogin');
  role:string = ''
  constructor(private router: Router,private global:Global) {
  }
  pathName:string = window.location.href.split('/')[3];
  ngOnInit(): void {
    this.role = this.global.role
  }
  navigateToDynamicPage(pageName: string) {
    this.router.navigate([pageName]);
    this.pathName = pageName
  }
  handleLog(){
    if(this.isLogin){
      this.global.isLogin = false
      localStorage.clear()
      window.location.href="/login"
    }
  }
  
}
