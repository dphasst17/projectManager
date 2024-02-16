import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { Global } from './service/global.service';
import {ApiService} from "../app/api/api.service"
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink, RouterLinkActive,HeaderComponent,FooterComponent,LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  pathLogin = window.location.href.split('/')[3];
  isLogin = this.globalService.isLogin
  loading:boolean = true
  constructor(private router: Router,private globalService: Global,private apiService: ApiService) {
  }
  ngOnInit(): void {
    this.apiService.startServer()
    .then(res => {
      if(res === "Hello."){
        this.loading = !this.loading
      }
    })
    if (!this.globalService.isLogin) {
      this.router.navigate(['/login'])
      return
    }
    if(new Date() > new Date((this.globalService.exp - 100) * 1000)){
      localStorage.clear()
      window.location.href="/login"
      return
    }
    this.apiService.fetchAutoUpdateStatus().then(res => console.log(res.message))
    this.apiService.fetchProject().then(res => {
      if(res.status === 200){
        this.globalService.changeProject(res.data)
      }
    })
    this.apiService.fetchInfo(this.globalService.token).then(async(res) => {
      if(res.status === 200){
        this.globalService.changeInfo(res.data);
      }
    })
    this.apiService.fetchStaff().then(res => {
      if(res.status === 200){
        this.globalService.changeStaffData(res.data)
      }
    })
  }

}
