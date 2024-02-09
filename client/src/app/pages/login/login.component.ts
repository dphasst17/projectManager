import { Component } from '@angular/core';
import {ApiService} from "../../api/api.service"
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isForgot:boolean = false
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
  handleForgotPassword(input:{username:string,email:string}){
    document.getElementById('username')?.classList.add(input.username === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('email')?.classList.add(input.email === "" ? 'border-red-500' : 'border-green-500')
    if(input.email !== "" && !this.regexEmail(input.email)){
      alert('Email is not valid')
      return
    }
    this.apiService.fetchForgotPassword({username:input.username,email:input.email})
    .then(res => {
      alert(res.message)
      if(res.status === 200){
        this.handleChangeForgot()
      }
    })
  }
  regexEmail(email:string):boolean{
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return regex.test(email);
  }
  handleChangeForgot(){
    this.isForgot = !this.isForgot
  }
}
