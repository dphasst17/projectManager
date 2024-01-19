import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit  {
  pathname = window.location.href.split('/')[3];

  ngOnInit(): void {
    // Chạy các hàm khi tải trang lần đầu
    this.checkPathname(this.pathname);
  }
  constructor(private router: Router) {
  }
  checkPathname(path:string){
    switch(path){
      case "":
        document.querySelectorAll('.navContent').forEach(e => {
          e.classList.remove('b g-blue-500','text-white')
        })
        document.getElementById('home')?.classList.add("bg-blue-500","text-white");
        break;
      case "project":
        document.querySelectorAll('.navContent').forEach(e => {
          e.classList.remove('bg-blue-500','text-white')
        })
        document.getElementById('project')?.classList.add("bg-blue-500","text-white");
        break;
        case "contact":
          document.querySelectorAll('.navContent').forEach(e => {
            e.classList.remove('bg-blue-500','text-white')
          })
          document.getElementById('contact')?.classList.add("bg-blue-500","text-white");
          break;
    }
  }
  navigateToDynamicPage(pageName: string) {
    this.router.navigate([pageName]);
    this.checkPathname(pageName)
  }
  
}
