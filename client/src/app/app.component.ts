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
    const token= this.globalService.getValueLocal('t')
    //Cập nhật trạng thái có dự án cũng như các task
    this.apiService.fetchAutoUpdateStatus().then(res => console.log(res.message))
    //Lây danh sách dự án và cập nhật lại biến global project
    this.apiService.fetchProject().then(res => {
      if(res.status === 200){
        this.globalService.changeProject(res.data)
      }
    })
    //Lấy thông tin người đang đăng nhập
    this.apiService.fetchInfo(this.globalService.token).then(async(res) => {
      if(res.status === 200){
        if(token){
          res.data[0].role === 'leader' && this.globalService.changeInfo(res.data);
          res.data[0].role === 'staff' && this.apiService.fetchProjectByStaff(token).then(resP => {
            if(resP.status === 200){
              res.data[0].position === 'PM' && this.globalService.changeInfo(
                res.data.map((e:any) => {
                  return {
                    ...e,
                    project:resP.data
                  }
                })
              );
              res.data[0].position !== 'PM' && this.apiService.fetchTaskTodoByStaff(token)
              .then(resT => {
                if(resT.status === 200){

                  const result = res.data.map((e:any) => {
                    return {
                      ...e,
                      project:resP.data,
                      todo:resT.data
                    }
                  })

                  this.globalService.changeInfo(result);
                }
                })
            }
          })
        }
      }
    })
    this.apiService.fetchStaff().then(res => {
      if(res.status === 200){
        this.globalService.changeStaffData(res.data)
        
      }
    })
    this.globalService.role === 'leader' && this.apiService.fetchProjectByStatus('processing')
    .then(res => {
      if(res.status === 200){
        this.globalService.changeProjectProcess(res.data[0])
      }
    })
  }

}
