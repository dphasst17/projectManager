import { Component } from '@angular/core';
import {ApiService} from "../../api/api.service"
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private apiService:ApiService,private router: Router){}
  handleSubmit = (input:{username:string,password:string}) => {
    document.getElementById('username')?.classList.add(input.username === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('password')?.classList.add(input.password === "" ? 'border-red-500' : 'border-green-500')
    if(input.username !== "" && input.password !== ""){
      this.apiService.fetchLogin(input).then((res:any) => {
        if(res.status === 500 || res.status === 401){
          alert(res.message)
          return
        }
        localStorage.setItem('role',res.role)
        localStorage.setItem('isLogin',JSON.stringify(true))
        localStorage.setItem('e',res.expAccess)
        localStorage.setItem('t',res.accessToken)
        window.location.href="/"        
      })
    }
  }
}
