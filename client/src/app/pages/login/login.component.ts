import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  handleSubmit = (input:{username:string,password:string}) => {
    document.getElementById('username')?.classList.add(input.username === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('password')?.classList.add(input.password === "" ? 'border-red-500' : 'border-green-500')
    if(input.username !== "" && input.password !== ""){
      console.log(input)
    }
  }
}
