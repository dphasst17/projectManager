import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  fetchProject = async() => {
    return fetch(`${environment.apiUrl}`).then(res => res.json());
  }
  fetchExpense = async() => {
    return fetch(`${environment.apiUrl}/api/project/expense`).then(res => res.json())
  }
  fetchAutoUpdateStatus = async() => {
    return fetch(`${environment.apiUrl}/api/project/update/status/auto`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res => res.json())
  }
  fetchTaskProcess = async(status:string) => {
    return fetch(`${environment.apiUrl}/api/project/task/status/${status}`).then(res => res.json())
  }
  fetchProjectByStatus = async(status:string) => {
    return fetch(`${environment.apiUrl}/api/project/status/${status}`).then(res => res.json())
  }
  
  fetchLogin = async(data:any) => {
    return fetch(`${environment.apiUrl}/auth/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(res => res.json())
  }
  fetchInfo = async(token:any) => {
    return fetch(`${environment.apiUrl}/user/info`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then(res => res.json())
  }
  fetchStaff = async() => {
    return fetch(`${environment.apiUrl}/user/staff`).then(res => res.json())
  }
}
